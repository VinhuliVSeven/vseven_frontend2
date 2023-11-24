import Card from 'react-bootstrap/Card';

import LinkJson from './LinkJson';
import bookmarks from './json/bookmarks.json'

interface Props {
    reload: () => any,
}

function SectionQuick(props: Props) {

    return (
    <>
        <Card>
            <Card.Header as='h6'>Quick Links</Card.Header>
            <Card.Body>
                {
                    bookmarks.data.map(
                        (link) => {
                            if (link[0] == '' || link[1] == '') return;
                            return (<LinkJson section_id={link[0]} link_id={link[1]} reload={props.reload} bookmark={true}></LinkJson>);
                        }
                    )
                }
            </Card.Body>
        </Card>
    </>
    );
}

export default SectionQuick;