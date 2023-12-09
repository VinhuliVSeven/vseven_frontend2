import Card from 'react-bootstrap/Card';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';

import LinkDraggable from './LinkDraggable';

import bookmarksJson from './json/bookmarks.json'
import linksJson from './json/links.json';

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

interface Props {
    reload: () => any
}

function QuickLinks(props: Props) {
    const [bookmarks, setBookmarks] = useState(bookmarksJson.data)

    const onDragEnd = (result: DropResult) => {
        if (result == null || result == undefined) return;
        const {destination} = result;
        if (!destination) return;
        const newBookmarks = Array.from(bookmarks);
        const [removed] = newBookmarks.splice(result.source.index, 1);
        newBookmarks.splice(destination.index, 0, removed);
        
        bookmarksJson.data = newBookmarks;
        setBookmarks(newBookmarks);
    }

    return (
    <>
        <Card>
            <Card.Header as='h6'>Quick Links</Card.Header>
            <Card.Body className='ps-0'>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='quicklinks'>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {bookmarks.map((bookmark, index) => {
                                    if (bookmark[0] == '' || bookmark[1] == '') return;

                                    var link = getLink(bookmark[0], bookmark[1])
                                    return (
                                        <LinkDraggable
                                            key={bookmark[1]}
                                            sectionId={bookmark[0]}
                                            link={link}
                                            index={index}
                                            reload={props.reload}
                                        />
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable> 
                </DragDropContext>
            </Card.Body>
        </Card>
    </>
    );
}

export default QuickLinks;