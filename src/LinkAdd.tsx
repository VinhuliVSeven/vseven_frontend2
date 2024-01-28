import './css/Admin.css';

import { useState } from 'react';
import React, { FormEventHandler,  } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import linksJson from './json/links.json';

interface Props {
    sectionId: string,
    linkOrders: {
        sectionId: string;
        order: string[];
    }[],
    setLinkOrders: React.Dispatch<React.SetStateAction<{
        sectionId: string;
        order: string[];
    }[]>>
}

function LinkAdd(props: Props) {
    const [show, setShow] = useState(false);
    const showHandler = () => {
        console.log(props.sectionId);
        setLinkId('');
        setLinkName('');
        setUrl('');
        setValidated(false);
        setShow(true);
    };
    const closeHandler = () => setShow(false);

    const [linkId, setLinkId] = useState('');
    const [linkName, setLinkName] = useState('');
    const [url, setUrl] = useState('');


    const [validated, setValidated] = useState(false);

    const submitHandler: FormEventHandler = (event) => {
        setValidated(true);
        event.preventDefault()

        var sectionFilter = linksJson.data.filter((section) => {return section.sectionId == props.sectionId});
        var linkFilter = sectionFilter[0].sectionLinks.filter((link) => link.linkId == linkId)
        
        // check empty
        if (linkId == '' || linkName == '') {
            event.stopPropagation();
        }

        // add section
        else if (linkFilter.length == 0) {
            sectionFilter[0].sectionLinks.push({
                linkId: linkId,
                linkName: linkName,
                url: url
            })

            const newLinkOrders = Array.from(props.linkOrders);
            newLinkOrders.filter((linkOrder) => linkOrder.sectionId == props.sectionId)[0].order.push(linkId);
            props.setLinkOrders(newLinkOrders);

            closeHandler();
        }
        else {
            setValidated(false);
            event.stopPropagation();
        }
    };
    

    return (
        <>
            <Button className='fill-width' variant='primary' onClick={showHandler}>＋ Add Link</Button>

            <Modal show={show} onHide={closeHandler}>
                <Modal.Header closeButton>
                    <Modal.Title><strong>Add New Link to Section {props.sectionId}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler} id={'addLink' + props.sectionId} noValidate validated={validated}>
                        <Form.Group className='mb-3' controlId='addLink.linkId'>
                            <Form.Label>Link ID <span style={{color: 'red'}}>*</span></Form.Label>
                            <Form.Control
                                type='text'
                                name='linkId'
                                onChange={(e) => setLinkId(e.target.value)}
                                required
                                autoFocus
                                isInvalid={linksJson.data.filter((section) => {return section.sectionId == props.sectionId})[0].sectionLinks.filter((link) => link.linkId == linkId).length != 0}
                                autoComplete='off'
                            />
                            <Form.Text muted>
                                The Link ID entered must be unique between links of the same section.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='addLink.linkName'>
                            <Form.Label>Link Name <span style={{color: 'red'}}>*</span></Form.Label>
                            <Form.Control
                                type='text'
                                name='linkName'
                                onChange={(e) => setLinkName(e.target.value)}
                                required
                                autoComplete='off'
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='addLink.url'>
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                type='text'
                                name='url'
                                placeholder='http://example.com'
                                onChange={(e) => setUrl(e.target.value)}
                                autoComplete='off'
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeHandler}>
                        Cancel
                    </Button>
                    <Button variant="primary" type='submit' form={'addLink' + props.sectionId}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LinkAdd;