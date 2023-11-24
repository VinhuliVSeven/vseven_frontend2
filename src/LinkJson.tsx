import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';

import './Link.css';
import bookmark from './assets/bookmark.svg';
import bookmark_fill from './assets/bookmark-fill.svg';
import links from './json/links.json';
import bookmarks from './json/bookmarks.json';


interface Props {
    section_id: string,
    link_id: string,
    reload: () => any,
    bookmark?: Boolean
}

function getSectionById(section_id: string) {
    return links.data.filter((section) => section_id == section.id)[0];
}

function getLinkById(section_id: string, link_id: string) {
    return getSectionById(section_id).section_links.filter((link) => link.id == link_id)[0];
}

function checkBookmark(section_id: string, link_id: string) {
    return bookmarks.data.filter((link) => section_id == link[0] && link_id == link[1])[0] != null ? true : false;
}

function LinkJson(props: Props) {
    const [bookmarked, setBookmarked] = useState(checkBookmark(props.section_id, props.link_id));
	const toggleBookmarked = () => {
        if (bookmarked) {
            for (var i = 0; i < bookmarks.data.length; i++) {
                if (bookmarks.data[i][0] == props.section_id && bookmarks.data[i][1] == props.link_id) {
                    bookmarks.data.splice(i, 1);
                    break;
                }
            }
        }
        else {
            bookmarks.data.push([props.section_id, props.link_id]);
        }

        setBookmarked(!bookmarked);
        props.reload();

        console.table(bookmarks.data)
    };

    return (
        <Container>
            <Row>
                <Col md lg>
                    <a href={getLinkById(props.section_id, props.link_id).link_target}>
                        <p className='hanging mb-0'>{getLinkById(props.section_id, props.link_id).link_name}</p>
                    </a>
                </Col>
                {
                    props.bookmark ? <>
                        <Col md='2' lg='1'>
                            <img onClick={toggleBookmarked} src={bookmarked ? bookmark_fill : bookmark} alt="Bookmark" className='bookmark float-right'/>
                        </Col>
                    </> : ''
                }
                
            </Row>
            
        </Container>
    );
}

export default LinkJson;