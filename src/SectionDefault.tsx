import Accordion from 'react-bootstrap/Accordion';

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
            <Accordion>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>
                        {getSection(props.sectionId).section_name}
                    </Accordion.Header>
                    <Accordion.Body>
                        {generateLinks(props.sectionId)}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <br/>
        </>
    );
}

export default SectionDefault;