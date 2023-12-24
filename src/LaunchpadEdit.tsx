import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './css/LaunchpadEdit.css';

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
                <Button className='button float-right' variant='primary' onClick={props.save}>Save</Button>{' '}
                <Button className='button float-right' variant='primary' onClick={props.cancel}>Cancel</Button>{' '}
            </Card.Body>
        </Card>
        

    </>
    );
}

export default LaunchpadEdit;