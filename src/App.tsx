{
	/* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/App.css';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from "./Header";
import Account from './Account';
import LaunchpadEdit from './LaunchpadEdit';
import QuickLinks from './QuickLinks';
import Frequent from './Frequent';
import SectionContainer from './SectionContainer';
import SectionDefault from './SectionDefault';

import orderJson from './json/order.json';
import bookmarksJson from './json/bookmarks.json';
import expandJson from './json/expand.json';
import linksJson from './json/links.json';

function resetData() {
	orderJson.data.section_order = orderJson.data.section_order_default;
	orderJson.data.link_order = [{section_id: '', order: []}]
	bookmarksJson.data = [['', '']];
	bookmarksJson.data.splice(0, 1);
	expandJson.data = [''];
}

function getSection(sectionId: string) {
    return linksJson.data.filter((section) => section.section_id == sectionId)[0];
}

function getLink(sectionId: string, linkId: string): {link_id: string, link_name: string, url: string} {
    var section = linksJson.data.filter((section) => section.section_id == sectionId)[0];
    if (section == undefined) {
        return {link_id: linkId, link_name: '<<LINK DOES NOT EXIST>>', url: '/'}
    }

    var link = section.section_links.filter((link) => link.link_id == linkId)[0];
    if (link == undefined) {
        return {link_id: linkId, link_name: '<<LINK DOES NOT EXIST>>', url: '/'}
    }

    return link;
}

function generateLinksFromOrder(linkOrder: {section_id: string, order: string[]}) {
	var links: {link_id: string, link_name: string, url: string}[] = [];
	if (linkOrder == null || linkOrder == undefined) return links;
	var section = getSection(linkOrder.section_id);
	if (section == null || section == undefined) return links;

	
	linkOrder.order.forEach((linkId) => {
		links.push(getLink(linkOrder.section_id, linkId));
	});

	return links;
}

function generateLinkOrders() {
	var remaining: string[] = [];
	linksJson.data.forEach((section) => {
		remaining.push(section.section_id);
	});

	var linkOrders: { section_id: string; order: string[]; }[] = [];
	orderJson.data.link_order.forEach((linkOrder) => {
		linkOrders.push(linkOrder);
		var index = remaining.indexOf(linkOrder.section_id, 0);
		if (index != -1) {
			remaining.splice(index, 1);
		}
	});

	remaining.forEach((sectionId) => {
		var linkOrder: {section_id: string, order: string[]} = {section_id: sectionId, order: []};
        
        // Fill with default order
        var sectionLinks = getSection(sectionId);
        sectionLinks.section_links.forEach((link) => {
            linkOrder.order.push(link.link_id);
        });

        linkOrders.push(linkOrder);
	});

	return linkOrders;
}

function App() {
	useEffect(() => {
		reset();
	}, []);

	const [sectionOrder, setSectionOrder] = useState(orderJson.data.section_order);
	const [linkOrders, setLinkOrders] = useState(generateLinkOrders());

	const [seed, setSeed] = useState(1);
	const reload = () => setSeed(Math.random());

	const [loggedIn, setLoggedIn] = useState(false);
	const toggleLoggedIn = () => {
		setLoggedIn(!loggedIn);
		reload();
	}

	const reset = () => {
		resetData();
		setSectionOrder(orderJson.data.section_order);
		setLinkOrders(generateLinkOrders());
		save();
		reload();
	}

	const save = () => {
		orderJson.data.section_order = sectionOrder;
		orderJson.data.link_order = linkOrders;
	}

	const cancel = () => {
		setSectionOrder(orderJson.data.section_order);
		setLinkOrders(orderJson.data.link_order);
		reload();
	}

	const getLinkOrder = (sectionId: string) => {
		return linkOrders.filter((section) => section.section_id == sectionId)[0];
	}

	const onDragEnd = (result: DropResult) => {
        if (result == null || result == undefined) return;
        const { source, destination, draggableId } = result;
		// console.log(source, destination, draggableId);

		if (!destination) return;
		if (draggableId.startsWith('link')) {
			// link reordering
			const sectionId = Number(source.droppableId.replace('section', ''));
			const index = linkOrders.findIndex((linkOrder) => linkOrder.section_id == String(sectionId));

			const newLinkOrders = Array.from(linkOrders);
			const [removed] = newLinkOrders[index].order.splice(result.source.index, 1);
			newLinkOrders[index].order.splice(destination.index, 0, removed);

			setLinkOrders(newLinkOrders);
		}
		else if (draggableId.startsWith('section')) {
			// section reordering
			const sourceId = Number(source.droppableId.replace('column', ''));
			const destinationId = Number(destination.droppableId.replace('column', ''));

			const newSectionOrder = Array.from(sectionOrder);
			const [removed] = newSectionOrder[sourceId].splice(result.source.index, 1);
			newSectionOrder[destinationId].splice(destination.index, 0, removed);
			
			setSectionOrder(newSectionOrder);
		}
	}

	const generateColumns = () => {
		const columns = [];
		
		for (let column = 0; column < 4; column++) {
			columns.push(
				<Col key={'column' + column}>
					<Droppable droppableId={'column' + column} type='section'>
						{(provided) => (
							<div key={seed + column} {...provided.droppableProps} ref={provided.innerRef}>
								{sectionOrder[column].map((sectionId, index) => (
									loggedIn ?
									<SectionContainer
										key={'section' + sectionId}
										sectionId={sectionId}
										index={index}
										links={generateLinksFromOrder(getLinkOrder(sectionId))}
										reload={reload}
									/> : <SectionDefault sectionId={sectionId}/>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</Col>
			);
		}

		return columns;
	}

	return (
		<>
			<Header></Header>
				<Container fluid className='vh-100 d-flex flex-column'>
					<Row className='h-100'>
						<Col className='fixed-column bg-dark pt-3'>
							<Stack gap={3}>
								<Account state={loggedIn} setState={toggleLoggedIn} reset={reset}></Account>
								{
									loggedIn ? <>
										<LaunchpadEdit save={save} cancel={cancel}></LaunchpadEdit>
										<QuickLinks reload={reload} key={seed - 1}></QuickLinks>
									</> : null
								}
								<Frequent></Frequent>
							</Stack>
						</Col>
						<Col>
							<DragDropContext onDragEnd={onDragEnd}>
								<Row>
									{generateColumns()}
								</Row>
							</DragDropContext>
						</Col>
					</Row>
				</Container>
		</>
	);
}

export default App;
