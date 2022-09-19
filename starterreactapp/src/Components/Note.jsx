import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../css/note.css";

export default function Note(props) {
    const [note, setnote] = useState({});

    useEffect(() => {
        async function getNote() {
            const response = await fetch(`note/${window.location.href.split("/")[3]}`);
            const data = await response.json();
            setnote(data);
            console.log(note);
        }
        if (note.title === undefined) {
            getNote();
        }
    }, []);

    return (
        <Form className="form-group">
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" defaultValue={note.title} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    className="form_textarea"
                    as="textarea"
                    rows={3}
                    defaultValue={note.description}
                    disabled
                />
            </Form.Group>
        </Form>
    );
}
