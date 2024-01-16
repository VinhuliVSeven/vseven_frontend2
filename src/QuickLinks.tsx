import Card from 'react-bootstrap/Card';
import { Droppable } from 'react-beautiful-dnd';

import LinkDraggable from './LinkDraggable';

interface Props {
    links: {
        linkId: string,
        linkName: string,
        url: string
    }[],
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
                                return (
                                    <LinkDraggable
                                        key={'link' + props.links[index].linkId + 'section' + bookmark[0]}
                                        sectionId={bookmark[0]}
                                        link={props.links[index]}
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