import { FormEventHandler, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { Api } from "./Api";

interface Props {
    setState: any,
    setApi: React.Dispatch<React.SetStateAction<Api>>,
}

function Login(props: Props) {
    const [show, setShow] = useState(false);
    const showHandler = () => {
        setValidated(false);
        setShow(true);
    }
    const closeHandler = () => setShow(false);

    const [showError, setShowError] = useState(false);
        const showErrorHandler = () => {
        setShowError(true);
        closeHandler();
    };
    const closeErrorHandler = () => {
        setShowError(false)
        setShow(true);
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [validated, setValidated] = useState(false);

    const submitHandler: FormEventHandler = (event) => {
        // setValidated(true);
        event.preventDefault()

        var parsedUsername = username;
        if (username.startsWith('user')) {
            parsedUsername = username.substring(4)
        }

        const api = new Api(parseInt(parsedUsername), password)
        api.get().then((data) => {
            props.setApi(api);
            props.setState();
            closeHandler();
        }).catch((error) => {
            showErrorHandler();
        });
    };

    return (
        <>
            <Button variant='primary' className='button float-right' onClick={showHandler}>Sign In</Button>

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

            <Modal show={showError} onHide={closeErrorHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Wrong username or password.</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeErrorHandler}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default Login;