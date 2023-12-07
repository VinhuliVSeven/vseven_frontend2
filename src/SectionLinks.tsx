import { Droppable } from 'react-beautiful-dnd';

import LinkDraggable from './LinkDraggable';

interface Props {
    sectionId: string,
    links: {
        link_id: string;
        link_name: string;
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
                                    key={'link' + link.link_id}
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