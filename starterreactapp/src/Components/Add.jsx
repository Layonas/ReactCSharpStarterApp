import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../css/add.css";

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            title: "",
            description: "",
            Note: {
                id: props.num + 1,
                title: "",
                description: "",
                date: "",
            },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.removeValidation = this.removeValidation.bind(this);
        this.descriptionChanged = this.descriptionChanged.bind(this);
        this.handleValidNote = this.handleValidNote.bind(this);
    }

    delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    handleSubmit = (event) => {
        var forms = document.querySelectorAll(".needs-validation");
        forms.forEach(async (form) => {
            if (form.checkValidity() === false) {
                form.classList.add("was-validated");
                this.setState({ validated: false });
                console.log("Not valid.");
                event.preventDefault();
                event.stopPropagation();
            } else {
                console.log("Valid.");

                await this.setState({
                    Note: {
                        id: this.props.num + 1,
                        title: this.state.title,
                        description: this.state.description,
                        date: new Date().toJSON(),
                    },
                });

                this.postNote();

                this.handleValidNote();
            }
        });
    };

    async handleValidNote() {
        this.setState({ validated: true });
        console.log(this.state.title);
        this.updateAddAnimationState();
        // tiny delay to remove incorrect validation result
        await this.delay(10);
        this.removeValidation();
        this.setState({ title: "" });
        this.setState({ description: "" });
    }

    removeValidation() {
        var forms = document.querySelectorAll(".needs-validation");

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms).forEach(function (form) {
            form.classList.remove("was-validated");
        });
        console.log("removed validation");
    }

    updateAddAnimationState() {
        var textDiv = document.getElementById("add-text");
        textDiv.style.animation = "none";
        textDiv.offsetHeight; /* trigger reflow */
        textDiv.style.animation = null;
        textDiv.style.animationPlayState = "running";
        console.log("Should be playing");
    }

    titleChanged(event) {
        this.setState({ title: event.target.value || "" });
    }
    descriptionChanged(event) {
        this.setState({ description: event.target.value || "" });
    }

    render() {
        return (
            <Form className="needs-validation" noValidate validated={this.state.validated}>
                <Row className="pos-rel mb-3 justify-content-md-center">
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            className="title"
                            required
                            type="text"
                            placeholder="Note title"
                            value={this.state.title}
                            onChange={this.titleChanged}
                        />
                        <Form.Control.Feedback>Good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please don't leave the title empty
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            className="description"
                            as="textarea"
                            required
                            type="text"
                            placeholder="Enter description"
                            value={this.state.description}
                            onChange={this.descriptionChanged}
                        />
                        <Form.Control.Feedback>Good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please don't leave the description empty
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <div className="addButtonDiv">
                    <div className="text-center product-successful" id="add-text">
                        <h5 className="text-muted" style={{ userSelect: "none" }}>
                            Note has been added successfully.
                        </h5>
                    </div>
                    <div className="text-end addButton">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg addButton"
                            onClick={this.handleSubmit}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </Form>
        );
    }

    async postNote() {
        console.log(this.state.Note);
        const response = await fetch("note", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state.Note),
        });
        console.log(response);
    }
}