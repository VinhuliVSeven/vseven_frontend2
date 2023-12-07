import './css/Header.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import logo from './assets/logo.png';

function Header() {
    return (
        <>
            <Navbar className='bg-body-tertiary'>
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
                </Container>
            </Navbar>
        </>
    );
}

export default Header;