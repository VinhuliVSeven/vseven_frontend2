import './css/Launchpad.css';

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
import { Api } from './Api';

import sectionOrderDefaultJson from './json/order_section_default.json';
import linkOrderJson from './json/order_link.json';
import bookmarksJson from './json/bookmarks.json';
import expandJson from './json/expand.json';
import linksJson from './json/links.json';

/**
 * @deprecated
 */
function resetJson() {
	linkOrderJson.data = [{sectionId: '', order: []}];
	bookmarksJson.data = [['', '']];
	bookmarksJson.data.splice(0, 1);
	expandJson.data = [''];
	expandJson.data.splice(0, 1);
}

/**
 * @deprecated
 */
function getSectionJson(sectionId: string) {
    return linksJson.data.filter((section) => section.sectionId == sectionId)[0];
}

/**
 * @deprecated
 */
function getLinkJson(sectionId: string, linkId: string): {linkId: string, linkName: string, url: string} {
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

/**
 * @deprecated
 */
function generateLinksFromOrderJson(linkOrder: {sectionId: string, order: string[]}) {
	var links: {linkId: string, linkName: string, url: string}[] = [];
	if (linkOrder == null || linkOrder == undefined) return links;
	var section = getSectionJson(linkOrder.sectionId);
	if (section == null || section == undefined) return links;

	
	linkOrder.order.forEach((linkId) => {
		links.push(getLinkJson(linkOrder.sectionId, linkId));
	});

	return links;
}

/**
 * @deprecated
 */
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
        var sectionLinks = getSectionJson(sectionId);
        sectionLinks.sectionLinks.forEach((link) => {
            linkOrder.order.push(link.linkId);
        });

        linkOrders.push(linkOrder);
	});

	return linkOrders;
}

function Launchpad() {
	useEffect(() => {
		resetJson();

		api.get().then((data) => {
			setLinks(data.getLinks());
			setSectionOrder(data.getSectionOrder());
			setLinkOrder(data.getLinkOrder());
			setBookmarks(data.getBookmarks());
			setBookmarksOld(data.getBookmarks());
		});

		api.frequent().then((data) => {
			setFrequent(data.topLinks);
		})

	}, []);

	const api = new Api(2);
	
	const [loggedIn, setLoggedIn] = useState(false);
	const toggleLoggedIn = () => {
		setLoggedIn(!loggedIn);
	}

	const [links, setLinks] = useState([{
		sectionId: '-1',
		sectionName: '',
		sectionLinks: [{
			linkId: '-1',
			linkName: '',
			url: ''
		}]
	}]);
	const [sectionOrder, setSectionOrder] = useState([['', '']]);
	const [linkOrder, setLinkOrder] = useState([{
		sectionId: '-1',
		order: ['']
	}]);
	const [bookmarks, setBookmarks] = useState([['', '']]);
	const [bookmarksOld, setBookmarksOld] = useState(bookmarks);
	const [frequent, setFrequent] = useState([{
		linkId: '',
		linkName: '',
		url: ''
	}]);

	// const [links, setLinks] = useState(linksJson.data);
	// const [sectionOrder, setSectionOrder] = useState(orderSectionJson.data);
	// const [linkOrder, setLinkOrder] = useState(generateLinkOrders());
	// const [bookmarks, setBookmarks] = useState(bookmarksJson.data);



	const reset = () => {
		api.unbookmark(bookmarks).then(() => {
			setBookmarksOld(bookmarks);
		});

		api.getDefault().then((data) => {
			api.save(api.convertSaveData(data.getSectionOrder(), data.getLinkOrder(), []));
		});

		api.get().then((data) => {
			setLinks(data.getLinks());
			setSectionOrder(data.getSectionOrder());
			setLinkOrder(data.getLinkOrder());
			setBookmarks(data.getBookmarks());
			setBookmarksOld(data.getBookmarks());
		});
	}

	const save = () => {
		// bookmarks added difference
		var bookmarksAdded: string[][] = [];
		bookmarks.forEach((bookmark) => {
			if (bookmarksOld.filter((bookmarkOld) => bookmark[0] == bookmarkOld[0] && bookmark[1] == bookmarkOld[1]).length == 0) {
				bookmarksAdded.push(bookmark);
			}
		});

		// bookmarks removed difference
		var bookmarksRemoved: string[][] = [];
		bookmarksOld.forEach((bookmarkOld) => {
			if (bookmarks.filter((bookmark) => bookmark[0] == bookmarkOld[0] && bookmark[1] == bookmarkOld[1]).length == 0) {
				bookmarksRemoved.push(bookmarkOld);
			}
		});

		api.save(api.convertSaveData(sectionOrder, linkOrder, bookmarksAdded));
		api.unbookmark(bookmarksRemoved).then(() => {
			setBookmarksOld(bookmarks);
		});
	}

	const load = () => {
		api.get().then((data) => {
			setLinks(data.getLinks());
			setSectionOrder(data.getSectionOrder());
			setLinkOrder(data.getLinkOrder());
			setBookmarks(data.getBookmarks());
			setBookmarksOld(data.getBookmarks());
		});
	}

	const getSection = (sectionId: string) => {
		return links.filter((section) => section.sectionId == sectionId)[0];
	}

	const getLink = (sectionId: string, linkId: string) => {
		var section = links.filter((section) => section.sectionId == sectionId)[0];
		if (section == undefined) {
			return {linkId: linkId, linkName: '<<LINK DOES NOT EXIST>>', url: '/'}
		}
	
		var link = section.sectionLinks.filter((link) => link.linkId == linkId)[0];
		if (link == undefined) {
			return {linkId: linkId, linkName: '<<LINK DOES NOT EXIST>>', url: '/'}
		}
	
		return link;
	}
	
	const generateLinksFromOrder = (linkOrder: {sectionId: string, order: string[]}) => {
		var links: {linkId: string, linkName: string, url: string}[] = [];
		if (linkOrder == null || linkOrder == undefined) return links;
		var section = getSection(linkOrder.sectionId);
		if (section == null || section == undefined) return links;
	
		
		linkOrder.order.forEach((linkId) => {
			links.push(getLink(linkOrder.sectionId, linkId));
		});
	
		return links;
	}

	const generateLinksFromBooksmarks = () => {
		var links: {
			linkId: string,
			linkName: string,
			url: string
		}[] = [];
		bookmarks.forEach((bookmark) => {
			links.push(getLink(bookmark[0], bookmark[1]));
		});

		return links;
	}

	const getLinkOrder = (sectionId: string) => {
		return linkOrder.filter((section) => section.sectionId == sectionId)[0];
	}

	const onDragEnd = (result: DropResult) => {
        if (result == null || result == undefined) return;
        const { source, destination, draggableId } = result;
		console.log(source, destination, draggableId);

		if (!destination) return;
		if (draggableId.startsWith('link')) {
			// link reordering
			const sectionId = Number(source.droppableId.replace('section', ''));
			const index = linkOrder.findIndex((linkOrder) => linkOrder.sectionId == String(sectionId));

			const newLinkOrders = Array.from(linkOrder);
			const [removed] = newLinkOrders[index].order.splice(result.source.index, 1);
			newLinkOrders[index].order.splice(destination.index, 0, removed);

			setLinkOrder(newLinkOrders);
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
					<Droppable droppableId={'column' + column} type='section'>
						{(provided) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								{loggedIn ? sectionOrder[column].map((sectionId, index) => (
										<SectionContainer
											key={'section' + sectionId}
											sectionId={sectionId}
											sectionName={getSection(sectionId).sectionName}
											links={generateLinksFromOrder(getLinkOrder(sectionId))}
											bookmarks={bookmarks}
											setBookmarks={setBookmarks}
											index={index}
											loggedIn={loggedIn}
										/> 
									)) : sectionOrderDefaultJson.data[column].map((sectionId) => (
										<SectionDefault key={'section' + sectionId} sectionId={sectionId} loggedIn={loggedIn}/>
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
							<Account state={loggedIn} setState={toggleLoggedIn} reset={() => {reset(); setTimeout(() => reset(), 100)}}></Account>
							{
								loggedIn ? <>
									<LaunchpadEdit save={save} cancel={load}></LaunchpadEdit>
									<DragDropContext onDragEnd={onDragEndBookmarks}>
										<QuickLinks
											links={generateLinksFromBooksmarks()}
											bookmarks={bookmarks}
											setBookmarks={setBookmarks}
										/>
									</DragDropContext>
								</> : null
							}
							<Frequent links={frequent}/>
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

export default Launchpad;
