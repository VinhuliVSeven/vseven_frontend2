import './css/Admin.css';

import { useState } from 'react';
import React, { Fragment, FormEventHandler,  } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import linksJson from './json/links.json';

interface Props {
    column: number
    sectionOrder: string[][],
    setSectionOrder: React.Dispatch<React.SetStateAction<string[][]>>
}

function ModalSection(props: Props) {
    const [show, setShow] = useState(false);
    const showHandler = () => setShow(true);
    const closeHandler = () => setShow(false);

    const [sectionId, setSectionId] = useState('');
    const [sectionName, setSectionName] = useState('');

    const submitHandler: FormEventHandler = (event) => {
        console.log('submit');

        event.preventDefault()
        
        console.log(sectionId);
        console.log(sectionName);

        // add section
        var filter = linksJson.data.filter((section) => {section.sectionId == sectionId});
        if (filter.length == 0) {
            linksJson.data.push({
                sectionId: sectionId,
                sectionName: sectionName,
                sectionLinks: []
            });
        }

        // add to order
        const newSectionOrder = Array.from(props.sectionOrder);
        newSectionOrder[props.column].push(sectionId);
        props.setSectionOrder(newSectionOrder);
    };
    

    return (
        <>
            <Button className='fill-width' variant='dark' onClick={showHandler}>＋ Add Section</Button>

            <Modal show={show} onHide={closeHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler} id={'addSection' + props.column}>
                        <Form.Group className='mb-3' controlId='addSection.sectionId'>
                            <Form.Label>Section ID</Form.Label>
                            <Form.Control
                                type='text'
                                name='sectionId'
                                onChange={(e) => setSectionId(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='addSection.sectionName'>
                            <Form.Label>Section Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='sectionId'
                                onChange={(e) => setSectionName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeHandler}>
                        Cancel
                    </Button>
                    <Button variant="primary" type='submit' form={'addSection' + props.column} onClick={closeHandler}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalSection;