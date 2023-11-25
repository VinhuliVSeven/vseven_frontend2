{
	/* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import { useState } from 'react';
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
import order from './json/order.json';
import bookmarks from './json/bookmarks.json';
import expand from './json/expand.json';

function resetData() {
	order.data = [["1", "2", "5"], ["3", "4"], ["6", "7"], ["8", "9", "10"]];
	bookmarks.data = [["", ""]];
	bookmarks.data.splice(0, 1);
	expand.data = [""];
}

function App() {
	const [seed, setSeed] = useState(1);
	const reload = () => setSeed(Math.random());

	const [loggedIn, setLoggedIn] = useState(false);
	const toggleLoggedIn = () => {
		setLoggedIn(!loggedIn);
		reload();
	}

	const reset = () => {
		resetData();
		reload();
	}

	const [selectionType, setSelectionType] = useState('');
	const [selectionValue, setSelectionValue] = useState([]);

	const setSelection = (type: string, value: any) => {
		setSelectionType(type);
		setSelectionValue(value);
	}

	return (
		<>
			<Header></Header>
			<Container fluid className='vh-100 d-flex flex-column'>
				<Row className='h-100'>
					<Col className='bg-dark pt-3'>
						<Stack gap={3}>
							<SectionAccount state={loggedIn} setState={toggleLoggedIn} reset={reset}></SectionAccount>
							{
								loggedIn ? <>
									<SectionLaunchpad type={selectionType} value={selectionValue}></SectionLaunchpad>
									<SectionQuick select={setSelection} reload={reload} key={seed}></SectionQuick>
								</> : null
							}
							<SectionFrequent></SectionFrequent>
						</Stack>
					</Col>
					<Col className='pt-3'>
						<Stack gap={3} key={seed}>
							{ order.data[0].map((id) => <SectionLinks id={id} reload={reload} select={setSelection} active={loggedIn}></SectionLinks>) }
						</Stack>
					</Col>
					<Col className='pt-3'>
						<Stack gap={3} key={seed}>
							{ order.data[1].map((id) => <SectionLinks id={id} reload={reload} select={setSelection} active={loggedIn}></SectionLinks>) }
						</Stack>
					</Col>
					<Col className='pt-3'>
						<Stack gap={3} key={seed}>
							{ order.data[2].map((id) => <SectionLinks id={id} reload={reload} select={setSelection} active={loggedIn}></SectionLinks>) }
						</Stack>
					</Col>
					<Col className='pt-3'>
						<Stack gap={3} key={seed}>
							{ order.data[3].map((id) => <SectionLinks id={id} reload={reload} select={setSelection} active={loggedIn}></SectionLinks>) }
						</Stack>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default App;
