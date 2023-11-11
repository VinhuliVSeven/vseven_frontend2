import Accordion from 'react-bootstrap/Accordion';

import Link from './Link';

function SectionCollapse() {
    return (
        <>
            <Accordion defaultActiveKey='0'>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>Collapsable Section</Accordion.Header>
                    <Accordion.Body>
                        <Link></Link>
                        <Link></Link>
                        <Link></Link>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default SectionCollapse;