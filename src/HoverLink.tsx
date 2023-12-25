import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';

interface Props {
    children?: React.ReactNode,
    id: string,
    title?: string,
    content?: React.ReactNode
}

function HoverLink(props: Props) {
    const popover = (
        <Popover id={props.id}>
            {
                props.title == undefined ? <></> : <Popover.Header as="h3">{props.title}</Popover.Header>
            }
            <Popover.Body>
                {props.content}
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <OverlayTrigger
                overlay={popover}
                placement='bottom'
            >
                <a href='#' className='ps-1 pe-1' style={{backgroundColor: 'white'}}>{props.children}</a>
            </OverlayTrigger>
        </>
    );

}

export default HoverLink;