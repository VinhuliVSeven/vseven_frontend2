import { FormEventHandler, useState } from "react";
import HoverLink from "./HoverLink";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import linksJson from './json/links.json';
import pen from './assets/pen.svg';

interface Props {
    section: {
        sectionId: string;
        sectionName: string;
        sectionLinks: {
            linkId: string;
            linkName: string;
            url: string;
        }[];
    },
    column: number,
    index: number
    sectionOrder: string[][],
    setSectionOrder: React.Dispatch<React.SetStateAction<string[][]>>
}

function SectionEdit(props: Props) {
    const tooltip = (
        <>
            <p>sectionId: "{props.section.sectionId}"</p>
            <p>sectionName: "{props.section.sectionName}"</p>
            <p>column: {props.column}</p>
            <p>index: {props.index}</p>
            <p>link count: {props.section.sectionLinks.length}</p>
        </>
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
        setSectionId(props.section.sectionId);
        setSectionName(props.section.sectionName);
        setValidated(false);
        setShow(true);
    };
    const closeHandler = () => setShow(false);

    const [sectionId, setSectionId] = useState(props.section.sectionId);
    const [sectionName, setSectionName] = useState(props.section.sectionName);

    const [validated, setValidated] = useState(false);

    const submitHandler: FormEventHandler = (event) => {
        setValidated(true);
        event.preventDefault();

        // check empty
        if (sectionId == '' || sectionName == '') {
            event.stopPropagation();
        }

        // add section
        else {
            const linksIndex = linksJson.data.findIndex((section) => section.sectionId == props.section.sectionId);
            
            linksJson.data[linksIndex] = {
                sectionId: sectionId,
                sectionName: sectionName,
                sectionLinks: linksJson.data[linksIndex].sectionLinks
            };

            const orderIndex = props.sectionOrder[props.column].findIndex((id) => id == props.section.sectionId);
            const newSectionOrder = Array.from(props.sectionOrder);
            newSectionOrder[props.column][orderIndex] = sectionId;
            props.setSectionOrder(newSectionOrder);

            closeHandler();
        }
    }

    const deleteSection = () => {
        const linksIndex = linksJson.data.findIndex((section) => section.sectionId == props.section.sectionId);
        
        linksJson.data.splice(linksIndex, 1);

        const orderIndex = props.sectionOrder[props.column].findIndex((id) => id == props.section.sectionId);
        const newSectionOrder = Array.from(props.sectionOrder);
        newSectionOrder[props.column].splice(orderIndex, 1);
        props.setSectionOrder(newSectionOrder);

        setShowDelete(false);
        closeHandler();
    }

    const validateId = () => {
        var filter = linksJson.data.filter((section) => {return section.sectionId == sectionId});
        if (filter.length == 0) {
            return false;
        }
        else if (filter[0].sectionId == props.section.sectionId) {
            return false;
        }
        return true;
    }

    const onClick = () => {
        showHandler();
    }

    return (
        <>
            <HoverLink
                id={'section' + props.section.sectionId}
                content={tooltip}
                onClick={onClick}
            >
                <img src={pen} style={{marginRight: 10}}/>
                {props.section.sectionId}
            </HoverLink>

            <Modal show={show} onHide={closeHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Section {props.section.sectionId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler} id={'editSection' + props.column} noValidate validated={validated}>
                        <Form.Group className='mb-3' controlId='editSection.sectionId'>
                            <Form.Label>Section ID</Form.Label>
                            <Form.Control
                                type='text'
                                name='sectionId'
                                defaultValue={sectionId}
                                onChange={(e) => setSectionId(e.target.value)}
                                required
                                autoFocus
                                isInvalid={validateId()}
                                autoComplete='off'
                            />
                            <Form.Text muted>
                                The Section ID entered must be unique.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='editSection.sectionName'>
                            <Form.Label>Section Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='sectionId'
                                defaultValue={sectionName}
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
                    <Button variant="danger" onClick={showDeleteHandler}>
                        Delete
                    </Button>
                    <Button variant="primary" type='submit' form={'editSection' + props.column}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={closeDeleteHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Section {props.section.sectionId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete section {props.section.sectionId}?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDeleteHandler}>
                        Cancel
                    </Button>
                    <Button variant='danger' onClick={deleteSection}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SectionEdit;