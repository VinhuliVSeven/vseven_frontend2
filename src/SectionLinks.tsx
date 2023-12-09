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
    reload: () => any
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
                                    index={index}
                                    reload={props.reload}
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