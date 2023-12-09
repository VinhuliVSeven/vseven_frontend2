import './css/Section.css';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Draggable } from 'react-beautiful-dnd';

import SectionLinks from './SectionLinks';
import SectionToggle from './SectionToggle';
import handle from './assets/grip-vertical.svg';


import linksJson from './json/links.json';
import expandJson from './json/expand.json';

function getSection(sectionId: string) {
    return linksJson.data.filter((section) => section.sectionId == sectionId)[0];
}

interface Props {
    sectionId: string,
    links: {
        linkId: string;
        linkName: string;
        url: string;
    }[],
    bookmarks: string[][],
    setBookmarks: React.Dispatch<React.SetStateAction<string[][]>>,
    loggedIn: Boolean,
    index: number,
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
                                        <Col sm='1' {...provided.dragHandleProps} className='handle-column'>
                                            <div className="handle-container">
                                                <img className='handle' src={handle} alt=''/>
                                            </div>
                                        </Col>
                                        <Col className='ps-0 pe-0'>
                                            <SectionToggle sectionId={props.sectionId} eventKey='0' loggedIn={props.loggedIn}>{getSection(props.sectionId).sectionName}</SectionToggle>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Accordion.Collapse eventKey='0'>
                                    <Card.Body className='section-body'>
                                        <SectionLinks
                                            key={'sectionlinks' + props.sectionId}
                                            sectionId={props.sectionId}
                                            links={props.links}
                                            bookmarks={props.bookmarks}
                                            setBookmarks={props.setBookmarks}
                                        />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        <br/>
                    </div>
                )}
            </Draggable>
        </>
    );
}

export default SectionContainer;