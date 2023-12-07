import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './css/Launchpad.css';

interface Props {
    save: () => any,
    cancel: () => any
}

function LaunchpadEdit(props: Props) {

    return (
    <>
        <Card>
            <Card.Header as='h6'>Launchpad Edit</Card.Header>
            <Card.Body>
                <Button className='' variant='success' onClick={props.save}>Save</Button>{' '}
                <Button className='' variant='secondary' onClick={props.cancel}>Cancel</Button>{' '}
            </Card.Body>
        </Card>
        

    </>
    );
}

export default LaunchpadEdit;