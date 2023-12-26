import { Droppable } from 'react-beautiful-dnd';

import LinkDraggableAdmin from './LinkDraggableAdmin';

import './css/Section.css';

interface Props {
    sectionId: string,
    links: {
        linkId: string;
        linkName: string;
        url: string;
    }[],
};

function SectionLinksAdmin(props: Props) {
    return (
        <>
            <Droppable droppableId={'section' + props.sectionId} type={'section' + props.sectionId}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {props.links.map((link, index) => {
                            return (
                                <LinkDraggableAdmin
                                    key={'link' + link.linkId}
                                    sectionId={props.sectionId}
                                    link={link}
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

export default SectionLinksAdmin;