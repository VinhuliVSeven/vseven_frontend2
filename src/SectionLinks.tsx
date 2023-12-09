import { Droppable } from 'react-beautiful-dnd';

import LinkDraggable from './LinkDraggable';

import './css/Section.css';

interface Props {
    sectionId: string,
    links: {
        linkId: string;
        linkName: string;
        url: string;
    }[],
    bookmarks: string[][],
    setBookmarks: React.Dispatch<React.SetStateAction<string[][]>>,
};

function SectionLinks(props: Props) {
    return (
        <>
            <Droppable droppableId={'section' + props.sectionId} type={'section' + props.sectionId}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {props.links.map((link, index) => {
                            return (
                                <LinkDraggable
                                    key={'link' + link.linkId}
                                    sectionId={props.sectionId}
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
        </>
    );
}

export default SectionLinks;