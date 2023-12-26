import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

// import './css/HoverLink.css';

interface Props {
    children?: React.ReactNode,
    id: string,
    title?: string,
    content?: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
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
                <button onClick={props.onClick} style={{backgroundColor: 'white', border: 'none'}}>
                    <a href='#' className='ps-1 pe-1' style={{backgroundColor: 'white'}}>{props.children}</a>
                </button>
            </OverlayTrigger>
        </>
    );

}

export default HoverLink;