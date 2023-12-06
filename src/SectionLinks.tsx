import Accordion from 'react-bootstrap/Accordion';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';

import LinkDraggable from './LinkDraggable';
import grip from './assets/grip-vertical.svg';

import order from './json/order.json';
import links from './json/links.json';
import expand from './json/expand.json';

function getSection(sectionId: string) {
    return links.data.filter((section) => section.section_id == sectionId)[0];
}

function getLinkOrder(sectionId: string) {
    var linkOrder = order.data.link_order.filter((section) => section.section_id == sectionId)[0];
    if (linkOrder == undefined) {
        linkOrder = {section_id: sectionId, order: []};
        
        // Fill linkOrder.order with default order
        var sectionLinks = getSection(sectionId);
        sectionLinks.section_links.forEach((link) => {
            linkOrder.order.push(link.link_id);
        });

        // set and return
        order.data.link_order.push(linkOrder);
        return linkOrder;
    }
    else {
        return linkOrder;
    }
}

function getLink(sectionId: string, linkId: string): {link_id: string, link_name: string, url: string} {
    var section = links.data.filter((section) => section.section_id == sectionId)[0];
    if (section == undefined) {
        return {link_id: linkId, link_name: '<<LINK DOES NOT EXIST>>', url: '/'}
    }

    var link = section.section_links.filter((link) => link.link_id == linkId)[0];
    if (link == undefined) {
        return {link_id: linkId, link_name: '<<LINK DOES NOT EXIST>>', url: '/'}
    }

    return link;
}

interface Props {
    sectionId: string,
    reload: () => any,
    loggedIn?: Boolean
};


function SectionLinks(props: Props) {
    const [linkOrder, setLinkOrder] = useState(getLinkOrder(props.sectionId).order)
    
    const onDragEnd = (result: DropResult) => {
        if (result == null || result == undefined) return;
        const { source, destination, draggableId } = result;
        if (!destination) return;
        const newOrder = Array.from(linkOrder);
        const [removed] = newOrder.splice(result.source.index, 1);
        newOrder.splice(destination.index, 0, removed);
        
        var index = order.data.link_order.indexOf(order.data.link_order.filter((link) => link.section_id == props.sectionId)[0])
        order.data.link_order[index].order = newOrder;
        setLinkOrder(newOrder);
    }

    let activeKey = false;
    if (props.loggedIn == true) activeKey = expand.data.includes(props.sectionId);

    return (
        <>
            <Accordion
                defaultActiveKey={activeKey ? '0' : '1'}
                onSelect={() => {
                    if (props.loggedIn != true) return;

                    if (activeKey) {
                        var index = expand.data.indexOf(props.sectionId);
                        if (index != 1) {
                            expand.data.splice(index, 1);
                        }
                    }
                    else {
                        expand.data.push(props.sectionId);
                    }
                }}
            >
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>
                        <img src={grip} alt='' className='grip'/>
                        {getSection(props.sectionId).section_name}
                    </Accordion.Header>
                    <Accordion.Body className={props.loggedIn ? 'ps-0' : ''}>
                        {/* {getLinks()} */}
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId={props.sectionId}>
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {linkOrder.map((linkId, index) => {
                                            var link = getLink(props.sectionId, linkId)
                                            return (
                                                <LinkDraggable
                                                    key={linkId}
                                                    sectionId={props.sectionId}
                                                    link={link}
                                                    index={index}
                                                    reload={props.reload}
                                                />
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable> 
                        </DragDropContext>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default SectionLinks;