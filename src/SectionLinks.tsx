import Accordion from 'react-bootstrap/Accordion';
import { DragDropContext, DropResult, Droppable, ResponderProvided, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

import LinkJson from './LinkJson';
import grip from './assets/grip-vertical.svg';

import order from './json/order.json';
import links from './json/links.json';
import expand from './json/expand.json';

function getSectionById(section_id: string) {
    return links.data.filter((section) => section.section_id == section_id)[0];
}

interface Props {
    section_id: string,
    reload: () => any,
    select: (type: string, value: Array<string>) => any,
    active?: Boolean
};


function SectionLinks(props: Props) {
    const [items, setItems] = useState(getSectionById(props.section_id).section_links);
    
    let activeKey = false;
    if (props.active == true) activeKey = expand.data.includes(props.section_id);

    const setSelectionSection = (value: any) => {
        props.select('section', value);
    };

    const setSelectionLink = (value: any) => {
        props.select('section link', value);
    }

    const getLinks = () => {
        var ordering = order.data.link_order.filter((section) => section.section_id == props.section_id);
        if (ordering.length == 0 || props.active != true) {
            // no custom ordering
            return getSectionById(props.section_id).section_links.map((link) =>
                <LinkJson section_id={props.section_id} link_id={link.link_id} reload={props.reload} select={setSelectionLink} active={props.active}></LinkJson>
            );
        }
        else {
            // custom ordering following ./json/order.json
            return ordering[0].order.map((link_id) => {
                return (<LinkJson section_id={props.section_id} link_id={link_id} reload={props.reload} select={setSelectionLink} active={props.active}></LinkJson>);
            });
        }
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        const newItems = Array.from(items);
        const [removed] = newItems.splice(result.source.index, 1);
        if (result == null || result == undefined) return;
        newItems.splice(destination.index, 0, removed);
        setItems(newItems);
    }

    return (
        <>  
            <Accordion
                defaultActiveKey={activeKey ? '0' : '1'}
                onSelect={() => {
                    if (props.active != true) return;

                    if (activeKey) {
                        var index = expand.data.indexOf(props.section_id);
                        if (index != 1) {
                            expand.data.splice(index, 1);
                        }
                    }
                    else {
                        expand.data.push(props.section_id);
                    }
                }}
            >
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>
                        {
                            props.active ? <>
                                <img onClick={() => {setSelectionSection([getSectionById(props.section_id).section_id])}} src={grip} alt='' className='grip'
                                />
                            </> : ''
                        }
                        
                        {getSectionById(props.section_id).section_name}
                    </Accordion.Header>
                    <Accordion.Body className={props.active ? 'ps-0' : ''}>
                        {/* {getLinks()} */}
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId={props.section_id}>
                                {(provided) => (
                                    <ul className={props.section_id} {...provided.droppableProps} ref={provided.innerRef}>
                                        {items.map((item, index) => (
                                            <Draggable key={item.link_id} draggableId={item.link_id} index={index}>
                                                {(provided) => (
                                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}><a href={item.url}>{item.link_name}</a></li>
                                                    // <LinkJson section_id={props.section_id} link_id={items.link_id} reload={props.reload} select={setSelectionLink} active={props.active}></LinkJson>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </ul>
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