{
	/* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'

import React, { useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from "./Header";
import SectionAccount from './SectionAccount';
import SectionLinks from './SectionLinks';
import SectionLaunchpad from './SectionLaunchpad';
import SectionQuick from './SectionQuick';
import SectionFrequent from './SectionFrequent';
import order from './order.json';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const toggleLoggedIn = () => setLoggedIn(!loggedIn);

	return (
		<>
			<Header></Header>
			<Container fluid className='vh-100 d-flex flex-column'>
				<Row className='h-100'>
					<Col className='bg-dark pt-3'>
						<Stack gap={3}>
							<SectionAccount state={loggedIn} setState={toggleLoggedIn}></SectionAccount>
							{
								loggedIn ? <>
									<SectionLaunchpad></SectionLaunchpad>
									<SectionQuick></SectionQuick>
								</> : null
							}
							<SectionFrequent></SectionFrequent>
						</Stack>
					</Col>
					<Col className='pt-3'>
						<Stack gap={3} key={loggedIn ? 0 : 1}>
							{ order.data[0].map((id) => <SectionLinks id={id}></SectionLinks>) }
						</Stack>
					</Col>
					<Col className='pt-3'>
						<Stack gap={3} key={loggedIn ? 0 : 1}>
							{ order.data[1].map((id) => <SectionLinks id={id}></SectionLinks>) }
						</Stack>
					</Col>
					<Col className='pt-3'>
						<Stack gap={3} key={loggedIn ? 0 : 1}>
							{ order.data[2].map((id) => <SectionLinks id={id}></SectionLinks>) }
						</Stack>
					</Col>
					<Col className='pt-3'>
						<Stack gap={3} key={loggedIn ? 0 : 1}>
							{ order.data[3].map((id) => <SectionLinks id={id}></SectionLinks>) }
						</Stack>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default App;
