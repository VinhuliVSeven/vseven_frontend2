import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'react-bootstrap';

import profile from './assets/profile.png';

interface Props {
	state: boolean,
	setState?: any;
}   

function SectionAccount(props: Props) {

    return (
    <>
        <Card>
            <Card.Header as='h6'>Account</Card.Header>
            <Card.Body>
                {
                    props.state ? <>
                        <Container className='mb-2'> 
                            <Row>
                                <Col xs lg='3' className='ps-0'>
                                    <Image src={profile} roundedCircle fluid/>
                                </Col>
                                <Col md='auto' className='ps-2'>
                                    <div className='vertical-center'>
                                        <Card.Title>Example Student</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">example@vinuni.edu.vn</Card.Subtitle>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <Button className='' variant='primary' onClick={props.setState}>Log Out</Button>{' '}
                        <Button className='' variant='primary'>Reset</Button>{' '}
                    </> : null
                }
                {
                    props.state ? null : <Button className='' variant='primary' onClick={props.setState}>Log In</Button>
                }
                
            </Card.Body>
        </Card>
        

    </>
    );
}

export default SectionAccount;