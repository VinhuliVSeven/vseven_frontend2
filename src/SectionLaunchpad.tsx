import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import links from './json/links.json';
import order from './json/order.json';
import bookmarks from './json/bookmarks.json';

import './SectionLaunchpad.css';

function reorderSection(direction: string, value: Array<string>) {
    var section_id = value[0];
    var column = 0;
    var index = 0;
    var maxIndex = null;

    // find section position in ordering
    for (column = 0; column < 4; column++) {
        for (index = 0; index < order.data.section_order[column].length; index++) {
            console.log(order.data.section_order[column][index]);
            if (order.data.section_order[column][index] == section_id) {
                maxIndex = order.data.section_order[column].length - 1;
                break;
            }
        }
        if (maxIndex != null) break;
    }

    if (maxIndex == null) return;

    if (direction == 'up') {
        if (index <= 0) return;
        [order.data.section_order[column][index], order.data.section_order[column][index - 1]] = [order.data.section_order[column][index - 1], order.data.section_order[column][index]]
    }
    else if (direction == 'down') {
        if (index >= maxIndex) return;
        [order.data.section_order[column][index], order.data.section_order[column][index + 1]] = [order.data.section_order[column][index + 1], order.data.section_order[column][index]]
    }
    else if (direction == 'left') {
        if (column <= 0) return;
        order.data.section_order[column].splice(index, 1);
        order.data.section_order[column - 1].push(section_id);
    }
    else if (direction == 'right') {
        if (column >= 3) return;
        order.data.section_order[column].splice(index, 1);
        order.data.section_order[column + 1].push(section_id);
    }
}

function reorderLink(direction: string, value: Array<string>) {
    if (order.data.link_order.filter((link) => link.section_id == value[0]).length == 0) {
        generateLinkOrder(value[0]);
    }

    var sectionIndex = order.data.link_order.indexOf(order.data.link_order.filter((link) => link.section_id == value[0])[0])

    var index = 0;
    var maxIndex = order.data.link_order[sectionIndex].order.length - 1;

    for (index = 0; index <= maxIndex + 1; index++) {
        if (index >= maxIndex + 1) return;
        if (order.data.link_order[sectionIndex].order[index] == value[1]) {
            break;
        }
    }

    if (direction == 'up') {
        if (index <= 0) return;
        [order.data.link_order[sectionIndex].order[index], order.data.link_order[sectionIndex].order[index - 1]] = [order.data.link_order[sectionIndex].order[index - 1], order.data.link_order[sectionIndex].order[index]];
    }
    else if (direction == 'down') {
        if (index >= maxIndex) return;
        [order.data.link_order[sectionIndex].order[index], order.data.link_order[sectionIndex].order[index + 1]] = [order.data.link_order[sectionIndex].order[index + 1], order.data.link_order[sectionIndex].order[index]];
    }
}

function reorderQuickLink(direction: string, value: Array<string>) {
    var index = 0;
    var maxIndex = bookmarks.data.length - 1;

    for (index = 0; index <= maxIndex + 1; index++) {
        if (index >= maxIndex + 1) return;
        if (bookmarks.data[index][0] == value[0] && bookmarks.data[index][1] == value[1]) {
            break;
        }
    }

    if (direction == 'up') {
        if (index <= 0) return;
        [bookmarks.data[index], bookmarks.data[index - 1]] = [bookmarks.data[index - 1], bookmarks.data[index]];
    }
    else if (direction == 'down') {
        if (index >= maxIndex) return;
        [bookmarks.data[index], bookmarks.data[index + 1]] = [bookmarks.data[index + 1], bookmarks.data[index]];
    }
}

function generateLinkOrder(section_id: string) {
    // generate ordering from ./json/link.json
    var section = links.data.filter((section) => section.section_id == section_id);
    if (section.length == 0) return;
    var link_ids = section[0].section_links.map((link) => link.link_id);
    
    // delete duplicate
    var index = order.data.link_order.indexOf(order.data.link_order.filter((section) => section.section_id == section_id)[0]);
    if (index != -1) {
        order.data.link_order.splice(index, 1);
    }

    // add new ordering
    order.data.link_order.push({
        "section_id": section_id,
        "order": link_ids
    })
}

interface Props {
    type: string,
    value: any,
    reload: () => any
}

function SectionLaunchpad(props: Props) {
    const [loggedIn, setLoggedIn] = useState(false);
	const onClick = () => setLoggedIn(!loggedIn);

    const reorder = (direction: string) => {
        if (props.type == 'section') {
            reorderSection(direction, props.value);
        }
        else if (props.type == 'section link') {
            reorderLink(direction, props.value);
        }
        else if (props.type == 'quick link') {
            reorderQuickLink(direction, props.value);
        }

        props.reload();
    };

    return (
    <>
        <Card>
            <Card.Header as='h6'>Launchpad Edit</Card.Header>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{'Selected type: ' + props.type}</ListGroup.Item>
                <ListGroup.Item>{'Selected value: ' + props.value}</ListGroup.Item>
            </ListGroup>
            <Card.Body className='pb-0'>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary" onClick={() => {reorder('left')}}>Left</Button>
                    <Button variant="secondary" onClick={() => {reorder('right')}}>Right</Button>
                </ButtonGroup> {' '}
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary" onClick={() => {reorder('up')}}>Up</Button>
                    <Button variant="secondary" onClick={() => {reorder('down')}}>Down</Button>
                </ButtonGroup>
            </Card.Body>
            <Card.Body>
                <Button className='' variant='success' onClick={onClick}>Save</Button>{' '}
                <Button className='' variant='secondary'>Cancel</Button>{' '}
            </Card.Body>
        </Card>
        

    </>
    );
}

export default SectionLaunchpad;