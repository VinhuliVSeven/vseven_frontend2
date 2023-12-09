import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';


import './css/Link.css';
import bookmark from './assets/bookmark.svg';
import bookmark_fill from './assets/bookmark-fill.svg';
import grip from './assets/grip-vertical.svg';

import links from './json/links.json';
import bookmarks from './json/bookmarks.json';


interface Props {
    sectionId: string,
    linkId: string,
    reload: () => any,
    // select: (value: Array<string>) => any,
    active?: Boolean
}

function getSectionById(sectionId: string) {
    return links.data.filter((section) => sectionId == section.sectionId)[0];
}

function getLinkById(sectionId: string, linkId: string) {
    var links = getSectionById(sectionId).sectionLinks.filter((link) => link.linkId == linkId);
    if (links.length == 0) {
        return {
            "linkId": linkId,
            "linkName": "<<LINK DOES NOT EXIST>>",
            "url": "/"
        }
    }
    return getSectionById(sectionId).sectionLinks.filter((link) => link.linkId == linkId)[0];
}

function checkBookmark(sectionId: string, linkId: string) {
    return bookmarks.data.filter((link) => sectionId == link[0] && linkId == link[1])[0] != null ? true : false;
}

function LinkJson(props: Props) {
    const [bookmarked, setBookmarked] = useState(checkBookmark(props.sectionId, props.linkId));
	const toggleBookmarked = () => {
        if (bookmarked) {
            for (var i = 0; i < bookmarks.data.length; i++) {
                if (bookmarks.data[i][0] == props.sectionId && bookmarks.data[i][1] == props.linkId) {
                    bookmarks.data.splice(i, 1);
                    break;
                }
            }
        }
        else {
            bookmarks.data.push([props.sectionId, props.linkId]);
        }

        setBookmarked(!bookmarked);
        props.reload();
    };

    return (
        <Container>
            <Row>
                {
                    props.active ? <>
                        <Col md='1' lg='1'>
                            <img src={grip} alt='' className='grip'/>
                        </Col>
                    </> : ''
                }
                <Col md lg>
                    <a href={getLinkById(props.sectionId, props.linkId).url}>
                        <p className='hanging mb-0'>{getLinkById(props.sectionId, props.linkId).linkName}</p>
                    </a>
                </Col>
                {
                    props.active ? <>
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