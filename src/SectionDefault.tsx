import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SectionToggle from './SectionToggle';
import Link from './Link';

import linksJson from './json/links.json';

function getSection(sectionId: string) {
    return linksJson.data.filter((section) => section.section_id == sectionId)[0];
}

function generateLinks(sectionId: string) {
    var links: JSX.Element[] = [];

    getSection(sectionId).section_links.forEach((link) => {
        links.push(
            <Link key={link.link_id} name={link.link_name} url={link.url}/>
        );
    })

    return links;
}

interface Props {
    sectionId: string
};


function SectionDefault(props: Props) {
    return (
        <>
            <Accordion defaultActiveKey={'1'}>
                <Card>
                    <Card.Header className='section-header'>
                        <Row className=''>
                            <Col md='12'>
                                <SectionToggle sectionId={props.sectionId} eventKey='0'>{getSection(props.sectionId).section_name}</SectionToggle>
                            </Col>
                        </Row>
                    </Card.Header>
                </Card>
                <Accordion.Collapse eventKey='0'>
                    <Card.Body className='section-body'>
                        {generateLinks(props.sectionId)}
                    </Card.Body>
                </Accordion.Collapse>
            </Accordion>
            <br/>
        </>
    );
}

export default SectionDefault;