import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import order from './json/bookmarks.json';
import bookmarks from './json/bookmarks.json';

import './SectionLaunchpad.css';

function reorderSection(direction: string, value: Array<string>) {

}

interface Props {
    type: string,
    value: any
}

function SectionLaunchpad(props: Props) {
    console.log(props.type + '' + props.value);

    const [loggedIn, setLoggedIn] = useState(false);
	const onClick = () => setLoggedIn(!loggedIn);

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
                    <Button variant="secondary">Left</Button>
                    <Button variant="secondary">Right</Button>
                </ButtonGroup> {' '}
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary">Up</Button>
                    <Button variant="secondary">Down</Button>
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