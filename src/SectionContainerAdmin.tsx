import './css/Section.css';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Draggable } from 'react-beautiful-dnd';

import SectionLinksAdmin from './SectionLinksAdmin';
import SectionToggle from './SectionToggle';
import SectionEdit from './SectionEdit';
import handle from './assets/grip-vertical.svg';

import linksJson from './json/links.json';
import expandJson from './json/expand.json';
import LinkAdd from './LinkAdd';
import { Container } from 'react-bootstrap';

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
    column: number,
    sectionOrder: string[][],
    setSectionOrder: React.Dispatch<React.SetStateAction<string[][]>>,
    linkOrders: {
        sectionId: string;
        order: string[];
    }[],
    setLinkOrders: React.Dispatch<React.SetStateAction<{
        sectionId: string;
        order: string[];
    }[]>>
};


function SectionContainerAdmin(props: Props) {
    var expanded = expandJson.data.includes(props.sectionId);
    const section = getSection(props.sectionId);

    return (
        <>
            <Draggable draggableId={'section' + props.sectionId} index={props.index}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                        <SectionEdit
                            section={section}
                            column={props.column}
                            index={props.index}
                            sectionOrder={props.sectionOrder}
                            setSectionOrder={props.setSectionOrder}
                        />
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
                                            <SectionToggle sectionId={props.sectionId} eventKey='0' loggedIn={props.loggedIn}>{section.sectionName}</SectionToggle>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Accordion.Collapse eventKey='0'>
                                    <Card.Body className='section-body pt-2'>
                                    <Container className='mb-2 ps-3 pe-3'>
                                        <LinkAdd
                                            sectionId={props.sectionId}
                                            linkOrders={props.linkOrders}
                                            setLinkOrders={props.setLinkOrders}
                                        />
                                    </Container>
                                        <SectionLinksAdmin
                                            key={'sectionlinks' + props.sectionId}
                                            sectionId={props.sectionId}
                                            links={props.links}
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

export default SectionContainerAdmin;