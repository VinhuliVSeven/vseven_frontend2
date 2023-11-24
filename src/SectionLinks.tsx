import Accordion from 'react-bootstrap/Accordion';

import LinkJson from './LinkJson';
import links from './json/links.json';
import expand from './json/expand.json'

interface Props {
    id: string
    reload: () => any
    active?: Boolean
};

function getSectionById(id: string) {
    return links.data.filter((section) => section.id == id)[0];
}

function SectionLinks(props: Props) {
    let activeKey = false;
    if (props.active == true) activeKey = expand.data.includes(props.id);

    return (
        <>
            <Accordion
                defaultActiveKey={activeKey ? '0' : '1'}
                onSelect={() => {
                    if (props.active != true) return;

                    if (activeKey) {
                        var index = expand.data.indexOf(props.id);
                        if (index != 1) {
                            expand.data.splice(index, 1);
                        }
                    }
                    else {
                        expand.data.push(props.id);
                    }
                }}
            >
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>{getSectionById(props.id).section_name}</Accordion.Header>
                    <Accordion.Body>
                        {
                            getSectionById(props.id).section_links.map(
                                (link) => <LinkJson section_id={props.id} link_id={link.id} reload={props.reload} bookmark={props.active}></LinkJson>
                            )
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default SectionLinks;