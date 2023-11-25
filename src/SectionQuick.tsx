import Card from 'react-bootstrap/Card';

import LinkJson from './LinkJson';
import bookmarks from './json/bookmarks.json'

interface Props {
    select: (type: string, value: Array<string>) => any,
    reload: () => any
}

function SectionQuick(props: Props) {

    const setSelection = (value: any) => {
        props.select('quick links', value);
    }

    return (
    <>
        <Card>
            <Card.Header as='h6'>Quick Links</Card.Header>
            <Card.Body className='ps-0'>
                {
                    bookmarks.data.map(
                        (link) => {
                            if (link[0] == '' || link[1] == '') return;
                            return (<LinkJson section_id={link[0]} link_id={link[1]} reload={props.reload} select={setSelection} active={true}></LinkJson>);
                        }
                    )
                }
            </Card.Body>
        </Card>
    </>
    );
}

export default SectionQuick;