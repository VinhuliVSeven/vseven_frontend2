import './css/Section.css';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Draggable } from 'react-beautiful-dnd';

import SectionLinks from './SectionLinks';
import SectionToggle from './SectionToggle';
import grip from './assets/grip-vertical.svg';

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
                        <Accordion defaultActiveKey={expanded ? '0' : '1'}>
                            <Card>
                                <Card.Header className='section-header'>
                                    <Row className=''>
                                        <Col sm='1'>
                                        <img {...provided.dragHandleProps} src={grip} alt='' className='grip'/>
                                        </Col>
                                        <Col fluid>
                                            <SectionToggle sectionId={props.sectionId} eventKey='0'>{getSection(props.sectionId).section_name}</SectionToggle>
                                        </Col>
                                    </Row>
                                </Card.Header>
                            </Card>
                            <Accordion.Collapse eventKey='0'>
                                <Card.Body className='section-body'>
                                    <SectionLinks
                                        key={'sectionlinks' + props.sectionId}
                                        sectionId={props.sectionId}
                                        links={props.links}
                                        reload={props.reload}
                                    />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Accordion>
                        <br/>
                    </div>
                )}
            </Draggable>
        </>
    );
}

export default SectionContainer;