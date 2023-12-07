import './css/Section.css';

import Accordion from 'react-bootstrap/Accordion';
import { Draggable } from 'react-beautiful-dnd';

import SectionLinks from './SectionLinks';

import linksJson from './json/links.json';
import expandJson from './json/expand.json';

function getSection(sectionId: string) {
    return linksJson.data.filter((section) => section.section_id == sectionId)[0];
}

interface Props {
    sectionId: string,
    index: number,
    links: {
        link_id: string;
        link_name: string;
        url: string;
    }[],
    reload: () => any,
};


function SectionContainer(props: Props) {
    var expanded = expandJson.data.includes(props.sectionId);

    return (
        <>
            <Draggable draggableId={'section' + props.sectionId} index={props.index}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                        <Accordion
                            defaultActiveKey={expanded ? '0' : '1'}
                            onSelect={() => {
                                if (expanded) {
                                    var index = expandJson.data.indexOf(props.sectionId);
                                    if (index != 1) {
                                        expandJson.data.splice(index, 1);
                                    }
                                }
                                else {
                                    expandJson.data.push(props.sectionId);
                                }
                            }}
                        >
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>
                                    {/* <img src={grip} alt='' className='grip'/> */}
                                    {getSection(props.sectionId).section_name}
                                </Accordion.Header>
                                <Accordion.Body className={'ps-0'}>
                                    <p {...provided.dragHandleProps}>drag and drop</p>
                                    <SectionLinks
                                        key={'sectionlinks' + props.sectionId}
                                        sectionId={props.sectionId}
                                        links={props.links}
                                        reload={props.reload}
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <br/>
                    </div>
                )}
            </Draggable>
        </>
    );
}

export default SectionContainer;