import './css/Launchpad.css';
import './css/Admin.css';

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
import SectionContainerAdmin from './SectionContainerAdmin';

import orderSectionJson from './json/order_section.json';
import sectionOrderDefaultJson from './json/order_section_default.json';
import linkOrderJson from './json/order_link.json';
import bookmarksJson from './json/bookmarks.json';
import expandJson from './json/expand.json';
import linksJson from './json/links.json';
import SectionAdd from './SectionAdd';


function resetJson() {
	linkOrderJson.data = [{sectionId: '', order: []}];
	bookmarksJson.data = [['', '']];
	bookmarksJson.data.splice(0, 1);
	expandJson.data = [''];
	expandJson.data.splice(0, 1);
}

function getSection(sectionId: string) {
    return linksJson.data.filter((section) => section.sectionId == sectionId)[0];
}

function getLink(sectionId: string, linkId: string): {linkId: string, linkName: string, url: string} {
    var section = linksJson.data.filter((section) => section.sectionId == sectionId)[0];
    if (section == undefined) {
        return {linkId: linkId, linkName: '<<LINK DOES NOT EXIST>>', url: '/'}
    }

    var link = section.sectionLinks.filter((link) => link.linkId == linkId)[0];
    if (link == undefined) {
        return {linkId: linkId, linkName: '<<LINK DOES NOT EXIST>>', url: '/'}
    }

    return link;
}

function generateLinksFromOrder(linkOrder: {sectionId: string, order: string[]}) {
	var links: {linkId: string, linkName: string, url: string}[] = [];
	if (linkOrder == null || linkOrder == undefined) return links;
	var section = getSection(linkOrder.sectionId);
	if (section == null || section == undefined) return links;

	
	linkOrder.order.forEach((linkId) => {
		links.push(getLink(linkOrder.sectionId, linkId));
	});

	return links;
}

function generateLinkOrders() {
	var remaining: string[] = [];
	linksJson.data.forEach((section) => {
		remaining.push(section.sectionId);
	});

	var linkOrders: { sectionId: string; order: string[]; }[] = [];
	linkOrderJson.data.forEach((linkOrder) => {
		linkOrders.push(linkOrder);
		var index = remaining.indexOf(linkOrder.sectionId, 0);
		if (index != -1) {
			remaining.splice(index, 1);
		}
	});

	remaining.forEach((sectionId) => {
		var linkOrder: {sectionId: string, order: string[]} = {sectionId: sectionId, order: []};
        
        // Fill with default order
        var sectionLinks = getSection(sectionId);
        sectionLinks.sectionLinks.forEach((link) => {
            linkOrder.order.push(link.linkId);
        });

        linkOrders.push(linkOrder);
	});

	return linkOrders;
}

function Admin() {
	useEffect(() => {
		resetJson();
		reset();
	}, []);

	const [sectionOrder, setSectionOrder] = useState(sectionOrderDefaultJson.data);
	const [linkOrders, setLinkOrders] = useState(generateLinkOrders());
	const [bookmarks, setBookmarks] = useState(bookmarksJson.data);

	const reset = () => {
		// ???????????????? ↓↓↓↓
		// setSectionOrder(sectionOrderDefault);
		// ???????????????? ↑↑↑↑
		setLinkOrders(generateLinkOrders());
		setBookmarks([]);
	}

	const save = () => {
		orderSectionJson.data = sectionOrder;
		linkOrderJson.data = linkOrders;
		bookmarksJson.data = bookmarks;
	}

	const load = () => {
		setSectionOrder(sectionOrderDefaultJson.data);
		setLinkOrders(generateLinkOrders());
		setBookmarks(bookmarksJson.data);
	}

	const getLinkOrder = (sectionId: string) => {
		return linkOrders.filter((section) => section.sectionId == sectionId)[0];
	}

	const onDragEnd = (result: DropResult) => {
        if (result == null || result == undefined) return;
        const { source, destination, draggableId } = result;
		console.log(source, destination, draggableId);

		if (!destination) return;
		if (draggableId.startsWith('link')) {
			// link reordering
			const sectionId = Number(source.droppableId.replace('section', ''));
			const index = linkOrders.findIndex((linkOrder) => linkOrder.sectionId == String(sectionId));

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

	const onDragEndBookmarks = (result: DropResult) => {
		if (result == null || result == undefined) return;
        const { source, destination, draggableId } = result;
		console.log(source, destination, draggableId);

		// bookmark reordering
		if (!destination) return;
        const newBookmarks = Array.from(bookmarks);
        const [removed] = newBookmarks.splice(result.source.index, 1);
        newBookmarks.splice(destination.index, 0, removed);
        
        setBookmarks(newBookmarks);
	}

	const generateColumns = () => {
		const columns = [];
		
		for (let column = 0; column < 4; column++) {
			columns.push(
				<Col key={'column' + column}>
                    <Container className='mb-4 ps-0 pe-0'>
                        <SectionAdd column={column} sectionOrder={sectionOrder} setSectionOrder={setSectionOrder}/>
                    </Container>
					<Droppable droppableId={'column' + column} type='section'>
						{(provided) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								{sectionOrder[column].map((sectionId, index) => (
                                        <SectionContainerAdmin
                                            key={'section' + sectionId}
                                            sectionId={sectionId}
                                            links={generateLinksFromOrder(getLinkOrder(sectionId))}
                                            bookmarks={bookmarks}
                                            setBookmarks={setBookmarks}
                                            index={index}
                                            loggedIn={true}
											column={column}
											sectionOrder={sectionOrder}
											setSectionOrder={setSectionOrder}
                                        /> 
									))
								}
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
			<Container fluid className='vh-100 d-flex flex-column columns'>
				<Row className='h-100'>
					<Col className='fixed-column vb-primary-blue pt-3'>
						<Stack gap={3}>
							{/* <Account state={true} setState={() => {})} reset={() => {})}></Account> */}
                            <LaunchpadEdit save={save} cancel={load}></LaunchpadEdit>
                            <DragDropContext onDragEnd={onDragEndBookmarks}>
                                <QuickLinks
                                    bookmarks={bookmarks}
                                    setBookmarks={setBookmarks}
                                />
                            </DragDropContext>
							<Frequent></Frequent>
						</Stack>
					</Col>
					<Col className='section-column pt-3'>
						<DragDropContext onDragEnd={onDragEnd}>
							<div className='background'/>
							<Row className='content'>
								{generateColumns()}
							</Row>
						</DragDropContext>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Admin;
