import './css/Header.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import logo from './assets/logo-full.svg';

function Header() {
    return (
        <div className='navbar-container'>
            <div className='header-color'>

            </div>
            <Navbar className='bg-body-tertiary navbar'>
                <Container fluid>
                    <Navbar.Brand>
                        <img 
                            src={logo}
                            alt='VinUni Launchpad'
                            // width='30'
                            height='40'
                            className='d-inline-block align-top header-logo'
                        />{' '}
                        <span className='header-text'>
                            VinUni LaunchPad
                        </span>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;