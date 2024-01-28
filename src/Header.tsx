import './css/Header.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import logo from './assets/logo-full.svg';

function Header() {
    return (
        <>
            <Navbar className='bg-body-tertiary navbar'>
                <Container fluid>
                    <Navbar.Brand>
                        <img 
                            src={logo}
                            alt='VinUni Launchpad'
                            // width='30'
                            height='30'
                            className='d-inline-block align-top header-logo'
                        />{' '}
                        <span className='header-text'>
                            VinUni LaunchPad
                        </span>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;