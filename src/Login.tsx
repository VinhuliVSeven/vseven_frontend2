import { FormEventHandler, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"


async function auth() {
    try {
        
    }
}

function Login() {
    const [show, setShow] = useState(false);
    const showHandler = () => {
        setValidated(false);
        setShow(true);
    }
    const closeHandler = () => setShow(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                    <Form onSubmit={submitHandler} id={'login'} noValidate validated={validated}>
                        <Form.Group className='mb-3' controlId='login.username'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                name='username'
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
}

export default Login