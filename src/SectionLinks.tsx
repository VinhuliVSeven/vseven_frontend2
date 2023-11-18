import Accordion from 'react-bootstrap/Accordion';

import Link from './Link';
import links from './links.json';

interface Props {
    id: string
};

function getSectionById(id: string) {
    return links.data.filter((section) => section.id == id)[0];
}

function SectionLinks(props: Props) {
    return (
        <>
            <Accordion defaultActiveKey='0'>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>{getSectionById(props.id).section_name}</Accordion.Header>
                    <Accordion.Body>
                        {
                            getSectionById(props.id).section_links.map(
                                (link) => <Link name={link.link_name} target={link.link_target}></Link>
                            )
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default SectionLinks;