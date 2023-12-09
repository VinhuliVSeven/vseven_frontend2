import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SectionToggle from './SectionToggle';
import Link from './Link';

import linksJson from './json/links.json';

function getSection(sectionId: string) {
    return linksJson.data.filter((section) => section.sectionId == sectionId)[0];
}

function generateLinks(sectionId: string) {
    var links: JSX.Element[] = [];

    getSection(sectionId).sectionLinks.forEach((link) => {
        links.push(
            <Link key={link.linkId} name={link.linkName} url={link.url}/>
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
                            <Col className='ps-0 pe-0'>
                                <SectionToggle sectionId={props.sectionId} eventKey='0'>{getSection(props.sectionId).sectionName}</SectionToggle>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Accordion.Collapse eventKey='0'>
                        <Card.Body className=''>
                            {generateLinks(props.sectionId)}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <br/>
        </>
    );
}

export default SectionDefault;