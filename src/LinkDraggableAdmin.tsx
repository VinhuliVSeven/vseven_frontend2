import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';
import LinkEdit from './LinkEdit';

import './css/Link.css';
import pen from './assets/pen.svg';
import grip from './assets/grip-vertical.svg';


interface Props {
    sectionId: string,
    link: {
        linkId: string;
        linkName: string;
        url: string;
    },
    index: number,
}

function LinkDraggableAdmin(props: Props) {
    return (
        <Container className='link'>
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
                                        <a href={props.link.url} target="_blank">
                                            <p className='hanging mb-0 link-overflow'>{props.link.linkName}</p>
                                        </a>
                                    </Col>
                                    <Col md='2' lg='1'>
                                        <LinkEdit
                                            sectionId={props.sectionId}
                                            link={props.link}
                                            index={props.index}
                                        />
                                    </Col>
                                </Row>   
                            </Container>
                        </div>
                    );
                }}
            </Draggable>
        </Container>
        
    );
}

export default LinkDraggableAdmin;