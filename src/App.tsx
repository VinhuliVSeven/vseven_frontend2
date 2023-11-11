{
	/* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'

import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from "./Header";
import Section from './Section';
import SectionCollapse from './SectionCollapse';

function App() {
	return (
		<>
			<Header></Header>
			<Container fluid className='vh-100 d-flex flex-column'>
				<Row className='h-100'>
					<Col className='bg-dark pt-3'>
						<Stack gap={3}>
							<Section></Section>
							<Section></Section>
							<Section></Section>
							<Section></Section>
						</Stack>
					</Col>
					<Col className='pt-3'>
						<Stack gap={3}>
							<SectionCollapse></SectionCollapse>
							<SectionCollapse></SectionCollapse>
							<SectionCollapse></SectionCollapse>
						</Stack>
					</Col>
					<Col className='pt-3'>
						<Stack gap={3}>
							<SectionCollapse></SectionCollapse>
							<SectionCollapse></SectionCollapse>
							<SectionCollapse></SectionCollapse>
							<SectionCollapse></SectionCollapse>
							<SectionCollapse></SectionCollapse>
							<SectionCollapse></SectionCollapse>
							<SectionCollapse></SectionCollapse>
						</Stack>
					</Col>
					<Col className='pt-3'>
						<Stack gap={3}>
							<SectionCollapse></SectionCollapse>
							<SectionCollapse></SectionCollapse>
							<SectionCollapse></SectionCollapse>
						</Stack>
					</Col>
					<Col className='pt-3'>
						<Stack gap={3}>
							<SectionCollapse></SectionCollapse>
							<SectionCollapse></SectionCollapse>
							<SectionCollapse></SectionCollapse>
							<SectionCollapse></SectionCollapse>
						</Stack>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default App;
