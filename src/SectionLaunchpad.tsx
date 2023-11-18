import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Placeholder from 'react-bootstrap/Placeholder';

function SectionLaunchpad() {
    const [loggedIn, setLoggedIn] = useState(false);
	const onClick = () => setLoggedIn(!loggedIn);

    return (
    <>
        <Card>
            <Card.Header as='h6'>Launchpad Edit</Card.Header>
            <Card.Body>
                <Button className='' variant='success' onClick={onClick}>Save</Button>{' '}
                <Button className='' variant='secondary'>Cancel</Button>{' '}
            </Card.Body>
        </Card>
        

    </>
    );
}

export default SectionLaunchpad;