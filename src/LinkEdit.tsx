import { FormEventHandler, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import linksJson from './json/links.json';
import pen from './assets/pen.svg';

interface Props {
    sectionId: string,
    link: {
        linkId: string;
        linkName: string;
        url: string;
    },
    index: number,
    linkOrders: {
        sectionId: string;
        order: string[];
    }[],
    setLinkOrders: React.Dispatch<React.SetStateAction<{
        sectionId: string;
        order: string[];
    }[]>>
}

function LinkEdit(props: Props) {
    const popover = (
        <Popover id={'popoverlink' + props.link.linkId + 'section' + props.sectionId}>
            <Popover.Body>
                <p>sectionId: "{props.sectionId}"</p>
                <p>linkId: "{props.link.linkId}"</p>
                <p>linkName: "{props.link.linkName}"</p>
                <p>url: "{props.link.url}"</p>
                <p>index: {props.index}</p>
            </Popover.Body>
        </Popover>
    );
    
    const [showDelete, setShowDelete] = useState(false);
    const showDeleteHandler = () => {
        setShowDelete(true);
        closeHandler();
    };
    const closeDeleteHandler = () => {
        setShowDelete(false)
        setShow(true);
    };
    
    const [show, setShow] = useState(false);
    const showHandler = () => {
        setLinkId(props.link.linkId);
        setLinkName(props.link.linkName);
        setUrl(props.link.url);
        setValidated(false);
        setShow(true);
    };
    const closeHandler = () => setShow(false);

    const [linkId, setLinkId] = useState(props.link.linkId);
    const [linkName, setLinkName] = useState(props.link.linkName);
    const [url, setUrl] = useState(props.link.url);

    const [validated, setValidated] = useState(false);

    const submitHandler: FormEventHandler = (event) => {
        setValidated(true);
        event.preventDefault();

        // check empty
        if (linkId == '' || linkName == '') {
            event.stopPropagation();
        }
        else if (validateId()) {
            setValidated(false);
            event.stopPropagation();
        }
        // edit link
        else {
            const sectionIndex = linksJson.data.findIndex((section) => section.sectionId == props.sectionId);
            const linkIndex = linksJson.data[sectionIndex].sectionLinks.findIndex((link) => link.linkId == props.link.linkId);

            linksJson.data[sectionIndex].sectionLinks[linkIndex] = {
                linkId: linkId,
                linkName: linkName,
                url: url
            };

            const sectionOrderIndex = props.linkOrders.findIndex((section) => section.sectionId == props.sectionId);
            const linkOrderIndex = props.linkOrders[sectionOrderIndex].order.findIndex((link) => link == props.link.linkId);
            const newLinkOrders = Array.from(props.linkOrders);
            newLinkOrders[sectionOrderIndex].order[linkOrderIndex] = linkId;
            props.setLinkOrders(newLinkOrders);

            closeHandler();
        }
    }

    const deleteSection = () => {
        const sectionIndex = linksJson.data.findIndex((section) => section.sectionId == props.sectionId);
        const linkIndex = linksJson.data[sectionIndex].sectionLinks.findIndex((link) => link.linkId == props.link.linkId);

        linksJson.data[sectionIndex].sectionLinks.splice(linkIndex, 1);

        const sectionOrderIndex = props.linkOrders.findIndex((section) => section.sectionId == props.sectionId);
        const linkOrderIndex = props.linkOrders[sectionOrderIndex].order.findIndex((link) => link == props.link.linkId);
        const newLinkOrders = Array.from(props.linkOrders);
        newLinkOrders[sectionOrderIndex].order.splice(linkOrderIndex, 1);
        props.setLinkOrders(newLinkOrders);

        setShowDelete(false);
        closeHandler();
    }

    const validateId = () => {
        var filter = linksJson.data.filter((section) => {return section.sectionId == props.sectionId})[0].sectionLinks.filter((link) => link.linkId == linkId)
        if (filter.length == 0) {
            return false;
        }
        else if (filter[0].linkId == props.link.linkId) {
            return false;
        }
        return true;
    }

    return (
        <>
            <OverlayTrigger
                    overlay={popover}
                    placement='bottom'
            >
                <img onClick={showHandler} src={pen} alt="Edit" className='bookmark float-right'/>
            </OverlayTrigger>  

            <Modal show={show} onHide={closeHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Link {props.link.linkId} of Section {props.sectionId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler} id={'editLink' + props.link.linkId + 'section' + props.sectionId} noValidate validated={validated}>
                        <Form.Group className='mb-3' controlId='editLink.linkId'>
                            <Form.Label>Link ID <span style={{color: 'red'}}>*</span></Form.Label>
                            <Form.Control
                                type='text'
                                name='linkId'
                                defaultValue={linkId}
                                onChange={(e) => setLinkId(e.target.value)}
                                required
                                autoFocus
                                isInvalid={validateId()}
                                autoComplete='off'
                            />
                            <Form.Text muted>
                                The Link ID entered must be unique between links of the same section.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='editLink.linkName'>
                            <Form.Label>Link Name <span style={{color: 'red'}}>*</span></Form.Label>
                            <Form.Control
                                type='text'
                                name='linkName'
                                defaultValue={linkName}
                                onChange={(e) => setLinkName(e.target.value)}
                                required
                                autoComplete='off'
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='editLink.url'>
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                type='text'
                                name='url'
                                defaultValue={url}
                                placeholder='http://example.com'
                                onChange={(e) => setUrl(e.target.value)}
                                autoComplete='off'
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button-gray" variant="secondary" onClick={closeHandler}>
                        Cancel
                    </Button>
                    <Button className="button-red" variant="danger" onClick={showDeleteHandler}>
                        Delete
                    </Button>
                    <Button className="button" variant="primary" type='submit' form={'editLink' + props.link.linkId + 'section' + props.sectionId}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={closeDeleteHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Link {props.link.linkId} of Section {props.sectionId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete link {props.link.linkId} of section {props.sectionId}?</Modal.Body>
                <Modal.Footer>
                    <Button className="button-gray" variant='secondary' onClick={closeDeleteHandler}>
                        Cancel
                    </Button>
                    <Button className="button-red" variant='danger' onClick={deleteSection}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LinkEdit;