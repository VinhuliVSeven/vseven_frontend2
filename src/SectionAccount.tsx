import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'react-bootstrap';

import profile from './assets/profile.png';

import './css/SectionAccount.css'

interface Props {
	state: boolean,
	setState: any,
    reset: () => any
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
                                <Col sm='2' md='2' lg='2' xl='2' className='ps-0 image'>
                                    <Image src={profile} roundedCircle fluid/>
                                </Col>
                                <Col xs='6' sm='7' md='7' lg='7' xl='8' className='ps-1'>
                                    <Card.Title><p className='overflow'>Example Student</p></Card.Title>
                                    <Card.Subtitle className='mb-2 text-muted'><p className='overflow'>exampleexample@vinuni.edu.vn</p></Card.Subtitle>
                                </Col>
                            </Row>
                        </Container>
                        <Button className='' variant='primary' onClick={props.setState}>Log Out</Button>{' '}
                        <Button className='' variant='primary' onClick={props.reset}>Reset</Button>{' '}
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