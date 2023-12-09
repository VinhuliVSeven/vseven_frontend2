import Card from 'react-bootstrap/Card';
import { Droppable } from 'react-beautiful-dnd';

import LinkDraggable from './LinkDraggable';

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
    bookmarks: string[][],
    setBookmarks: React.Dispatch<React.SetStateAction<string[][]>>,
}

function QuickLinks(props: Props) {
    return (
    <>
        <Card>
            <Card.Header as='h6'>Quick Links</Card.Header>
            <Card.Body className='ps-0'>
                <Droppable droppableId='bookmarks'>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {props.bookmarks.map((bookmark, index) => {
                                var link = getLink(bookmark[0], bookmark[1]);
                                return (
                                    <LinkDraggable
                                        key={'link' + link.linkId + 'section' + bookmark[0]}
                                        sectionId={bookmark[0]}
                                        link={link}
                                        bookmarks={props.bookmarks}
                                        setBookmarks={props.setBookmarks}
                                        index={index}
                                    />
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable> 
            </Card.Body>
        </Card>
    </>
    );
}

export default QuickLinks;