import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

import LinkJson from './LinkJson';
import grip from './assets/grip-vertical.svg';

import links from './json/links.json';
import expand from './json/expand.json';

interface Props {
    id: string,
    reload: () => any,
    select: (type: string, value: Array<string>) => any,
    active?: Boolean
};

function getSectionById(id: string) {
    return links.data.filter((section) => section.id == id)[0];
}

function SectionLinks(props: Props) {
    let activeKey = false;
    if (props.active == true) activeKey = expand.data.includes(props.id);

    const setSelectionSection = (value: any) => {
        props.select('section', value);
    };

    const setSelectionLink = (value: any) => {
        props.select('section link', value);
    }

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
                    <Accordion.Header>
                        {
                            props.active ? <>
                                <img onClick={() => {setSelectionSection([getSectionById(props.id).id])}} src={grip} alt='' className='grip'
                                />
                            </> : ''
                        }
                        
                        {getSectionById(props.id).section_name}
                    </Accordion.Header>
                    <Accordion.Body className={props.active ? 'ps-0' : ''}>
                        {
                            getSectionById(props.id).section_links.map(
                                (link) => <LinkJson section_id={props.id} link_id={link.id} reload={props.reload} select={setSelectionLink} active={props.active}></LinkJson>
                            )
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default SectionLinks;