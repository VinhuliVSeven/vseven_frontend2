import './css/Header.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import logo from './assets/logo.png';

function Header() {
    return (
        <>
            <Navbar className='bg-body-tertiary navbar'>
                <Container fluid>
                    <Navbar.Brand>
                        <img 
                            src={logo}
                            alt='VinUni Launchpad'
                            width='30'
                            height='30'
                            className='d-inline-block align-top'
                        />{' '}
                        VinUni LaunchPad
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        {/* <Link to='/admin'>
                            <Button className='button' variant='primary'>Link Editor</Button>
                        </Link> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;