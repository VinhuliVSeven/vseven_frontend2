import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

import './css/Link.css';
import bookmark from './assets/bookmark.svg';
import bookmark_fill from './assets/bookmark-fill.svg';
import grip from './assets/grip-vertical.svg';

interface Props {
    sectionId: string,
    link: {
        linkId: string;
        linkName: string;
        url: string;
    },
    bookmarks: string[][],
    setBookmarks: React.Dispatch<React.SetStateAction<string[][]>>,
    index: number,
}

function LinkDraggable(props: Props) {
    const checkBookmark = (sectionId: string, linkId: string) => {
        return props.bookmarks.filter((bookmark) => sectionId == bookmark[0] && linkId == bookmark[1])[0] != null ? true : false;
    };

	const toggleBookmarked = () => {
        const newBookmarks = Array.from(props.bookmarks);

        if (checkBookmark(props.sectionId, props.link.linkId)) {
            // unbookmark
            for (var i = 0; i < newBookmarks.length; i++) {
                if (newBookmarks[i][0] == props.sectionId && newBookmarks[i][1] == props.link.linkId) {
                    newBookmarks.splice(i, 1);
                    break;
                }
            }
        }
        else {
            // bookmark
            newBookmarks.push([props.sectionId, props.link.linkId]);
        }
        
        props.setBookmarks(newBookmarks)
    };

    return (
        <Draggable draggableId={'link' + props.link.linkId + 'section' + props.sectionId} index={props.index}>
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
                                        <p className='hanging mb-0'>{props.link.linkName}</p>
                                    </a>
                                </Col>
                                <Col md='2' lg='1'>
                                    <img onClick={toggleBookmarked} src={checkBookmark(props.sectionId, props.link.linkId) ? bookmark_fill : bookmark} alt="Bookmark" className='bookmark float-right'/>
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