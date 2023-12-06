import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

import './css/Link.css';
import bookmark from './assets/bookmark.svg';
import bookmark_fill from './assets/bookmark-fill.svg';
import grip from './assets/grip-vertical.svg';

import bookmarks from './json/bookmarks.json';

interface Props {
    sectionId: string,
    link: {
        link_id: string;
        link_name: string;
        url: string;
    },
    index: number,
    reload: () => any
}

function checkBookmark(section_id: string, link_id: string) {
    return bookmarks.data.filter((link) => section_id == link[0] && link_id == link[1])[0] != null ? true : false;
}

function LinkDraggable(props: Props) {
    const [bookmarked, setBookmarked] = useState(checkBookmark(props.sectionId, props.link.link_id));
	const toggleBookmarked = () => {
        if (bookmarked) {
            for (var i = 0; i < bookmarks.data.length; i++) {
                if (bookmarks.data[i][0] == props.sectionId && bookmarks.data[i][1] == props.link.link_id) {
                    bookmarks.data.splice(i, 1);
                    break;
                }
            }
        }
        else {
            bookmarks.data.push([props.sectionId, props.link.link_id]);
        }

        setBookmarked(!bookmarked);
        props.reload();
    };

    return (
        <Draggable draggableId={props.link.link_id} index={props.index}>
            {(provided) => {
                return (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                        <Container>
                            <Row>
                                <Col md='1' lg='1'>
                                    <img src={grip} alt='' className='grip' {...provided.dragHandleProps}/>
                                </Col>
                                <Col md lg>
                                    <a href={props.link.url}>
                                        <p className='hanging mb-0'>{props.link.link_name}</p>
                                    </a>
                                </Col>
                                <Col md='2' lg='1'>
                                    <img onClick={toggleBookmarked} src={bookmarked ? bookmark_fill : bookmark} alt="Bookmark" className='bookmark float-right'/>
                                </Col>
                            </Row>   
                        </Container>
                    </div>
                );
            }}
        </Draggable>
    );
}

export default LinkDraggable;