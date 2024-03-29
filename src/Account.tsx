import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'react-bootstrap';

import profile from './assets/profile.png';
import Login from './Login';
import { Api } from './Api';

import './css/Account.css'
import { useState } from 'react';


interface Props {
	state: boolean,
	setState: any,
    setApi: React.Dispatch<React.SetStateAction<Api>>,
    reset: () => any
}   

function Account(props: Props) {
    const [username, setUsername] = useState('');

    return (
    <>
        <Card>
            <Card.Header as='h6'><span className="fixed-title">Account</span></Card.Header>
            <Card.Body>
                {
                    props.state ? <>
                        <Container className='mb-2'> 
                            <Row>
                                <Col sm='2' md='2' lg='2' xl='2' className='ps-0 image'>
                                    <Image src={profile} roundedCircle fluid/>
                                </Col>
                                <Col xs='6' sm='7' md='7' lg='7' xl='8' className='ps-1'>
                                    <Card.Title><p className='overflow'>{username}</p></Card.Title>
                                    <Card.Subtitle className='mb-2 text-muted'><p className='overflow'>exampleexample@vinuni.edu.vn</p></Card.Subtitle>
                                </Col>
                            </Row>
                        </Container>
                        <Button className='button float-right' variant='primary' onClick={props.setState}>Sign Out</Button>{' '}
                        <Button className='button-red float-right' variant='danger' onClick={props.reset}>Reset</Button>{' '}
                    </> : null
                }
                {
                    props.state ? null : <Login setState={props.setState} setApi={props.setApi} setUsername={setUsername}/>
                    // props.state ? null : <Button className='button' variant='primary' onClick={props.setState}>Sign In</Button>
                }
                
            </Card.Body>
        </Card>
    </>
    );
}

export default Account;