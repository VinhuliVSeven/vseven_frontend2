import { FormEventHandler, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import axios from 'axios';
function Login() {
    const [show, setShow] = useState(false);
    const showHandler = () => {
        setValidated(false);
        setShow(true);
    }
    const closeHandler = () => setShow(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [responseData, setResponseData] = useState('');

    const [validated, setValidated] = useState(false);

    const submitHandler: FormEventHandler = (event) => {
        setValidated(true);
        event.preventDefault()


    };
    return (
        <>
            <Button variant='dark' onClick={showHandler}>Log In be</Button>

            <Modal show={show} onHide={closeHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} id={'login'} noValidate validated={validated}>
                        <Form.Group className='mb-3' controlId='login.username'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                name='username'
                                value= {username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoFocus
                                autoComplete='off'
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='login.password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                value = {password}
                                name='password'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete='off'
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeHandler}>
                        Cancel
                    </Button>
                    <Button variant="primary" type='submit' form={'login'}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>

            
        </>
    )
    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
          const session_url = "http://localhost:8080/api/${username}/get";
    
          const response = await axios.get(session_url, {
            auth: {
              username: username,
              password: password,
            },
          });
    
          // Handle successful login response here if needed
          setResponseData(response.data);
          console.log(response.data);
        } catch (error) {
          // Handle login error here
          console.error("Login failed:", error);
        }
      }
    }


export default Login