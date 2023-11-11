import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

function Section() {
    return (
    <>
        <Card>
            <Card.Header as='h6'>Account</Card.Header>
            <Card.Body>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                {/* <Placeholder.Button variant="primary" xs={6} /> */}
                <Button className='float-end' variant='primary'>Log In</Button>
            </Card.Body>
        </Card>
        

    </>
    );
}

export default Section;