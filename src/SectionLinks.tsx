import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

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
                        {getLinks()}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default SectionLinks;