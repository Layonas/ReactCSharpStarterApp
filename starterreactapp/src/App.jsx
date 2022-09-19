import React, { Component } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import Add from "./Components/Add";
import Note from "./Components/Note";

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            note: null,
            loading: true,
            idMax: Number,
            noteId: Number,
        };
        this.noteClickEvent = this.noteClickEvent.bind(this);
    }

    componentDidMount() {
        this.getNotes();
    }

    renderNotesTable(notes) {
        return (
            <table className="table table-striped table-hover" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note) => (
                        <tr key={note.id} onClick={() => this.noteClickEvent(note.id)}>
                            <td>{note.id}</td>
                            <td>{this.formatDate(note.date)}</td>
                            <td>{note.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    async noteClickEvent(id) {
        window.location.href = window.location.href + id;
    }

    formatDate(date) {
        let formatedDate = new Date(date);
        return formatedDate.toISOString().split("T")[0];
    }

    render() {
        let contents = this.state.loading ? (
            <p>
                <em>
                    Loading... Please refresh once the ASP.NET backend has started. See{" "}
                    <a href="https://aka.ms/jspsintegrationreact">
                        https://aka.ms/jspsintegrationreact
                    </a>{" "}
                    for more details.
                </em>
            </p>
        ) : (
            this.renderNotesTable(this.state.notes)
        );
        return (
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header />
                                {contents}
                            </>
                        }
                    />
                    <Route
                        path="/Add"
                        element={
                            <>
                                <Header />
                                <Add num={this.state.idMax} />
                            </>
                        }
                    />
                    <Route
                        path="/:id"
                        element={
                            <>
                                <Header />
                                <Note note={this.state.note} />
                            </>
                        }
                    />
                    <Route
                        path="/*"
                        element={
                            <>
                                <Header />
                                <h1 className="text text-center">Not found</h1>
                            </>
                        }
                    />
                </Routes>
            </div>
        );
    }

    async getNotes() {
        const response = await fetch("note");
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        this.setState({ notes: data, loading: false });
        if (this.state.notes.length !== 0) {
            const maxId = this.state.notes[this.state.notes.length - 1].id;
            this.setState({ idMax: maxId });
        }
    }
}
