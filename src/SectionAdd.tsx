import './css/Admin.css';

import { useState } from 'react';
import React, { FormEventHandler,  } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import linksJson from './json/links.json';

interface Props {
    column: number
    sectionOrder: string[][],
    setSectionOrder: React.Dispatch<React.SetStateAction<string[][]>>
}

function SectionAdd(props: Props) {
    const [show, setShow] = useState(false);
    const showHandler = () => {
        setSectionId('');
        setSectionName('');
        setValidated(false);
        setShow(true);
    };
    const closeHandler = () => setShow(false);

    const [sectionId, setSectionId] = useState('');
    const [sectionName, setSectionName] = useState('');

    const [validated, setValidated] = useState(false);

    const submitHandler: FormEventHandler = (event) => {
        setValidated(true);
        event.preventDefault()

        var filter = linksJson.data.filter((section) => {return section.sectionId == sectionId});

        // check empty
        if (sectionId == '' || sectionName == '') {
            event.stopPropagation();
        }

        // add section
        else if (filter.length == 0) {
            linksJson.data.push({
                sectionId: sectionId,
                sectionName: sectionName,
                sectionLinks: []
            });

            // add to order
            const newSectionOrder = Array.from(props.sectionOrder);
            newSectionOrder[props.column].push(sectionId);
            props.setSectionOrder(newSectionOrder);

            closeHandler();
        }
        else {
            setValidated(false);
            event.stopPropagation();
        }
    };
    

    return (
        <>
            <Button className='fill-width' variant='dark' onClick={showHandler}>＋ Add Section</Button>

            <Modal show={show} onHide={closeHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Section to Column {props.column}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler} id={'addSection' + props.column} noValidate validated={validated}>
                        <Form.Group className='mb-3' controlId='addSection.sectionId'>
                            <Form.Label>Section ID <span style={{color: 'red'}}>*</span></Form.Label>
                            <Form.Control
                                type='text'
                                name='sectionId'
                                onChange={(e) => setSectionId(e.target.value)}
                                required
                                autoFocus
                                isInvalid={linksJson.data.filter((section) => {return section.sectionId == sectionId}).length != 0}
                                autoComplete='off'
                            />
                            <Form.Text muted>
                                The Section ID entered must be unique.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='addSection.sectionName'>
                            <Form.Label>Section Name <span style={{color: 'red'}}>*</span></Form.Label>
                            <Form.Control
                                type='text'
                                name='sectionId'
                                onChange={(e) => setSectionName(e.target.value)}
                                required
                                autoComplete='off'
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeHandler}>
                        Cancel
                    </Button>
                    <Button variant="primary" type='submit' form={'addSection' + props.column}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SectionAdd;