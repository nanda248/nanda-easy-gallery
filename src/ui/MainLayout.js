import React, { Component } from 'react';
import SingleNote from './SingleNote';
import data from '../data/sampleData';
import swal from 'sweetalert';
import Navbar from './Navbar';

class MainLayout extends Component {

    constructor() {
        super()
        this.state = {
            notes: data,
            searchValue: '',
            searchResult: []
        }

        this.addNewNote = this.addNewNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.handleSearchValue = this.handleSearchValue.bind(this);
    }

    addNewNote(title, content) {
        const { notes } = this.state;
        const newNote = {
            id: notes.length+1,
            title,
            content
        }
        swal({
            text: "Added!",
            icon: "success",
          });
        notes.push(newNote)
        this.setState({notes: notes})
    }

    deleteNote(id) {
        const { notes } = this.state;
        const index = notes.findIndex((note) => note.id === id)
        notes.splice(index, 1);
        this.setState({ notes })
    }

    renderNotes() {
        const { notes, searchResult, searchValue } = this.state;
        if(searchValue !== "" && searchResult.length === 0) {
            return <h4>No Matching Result</h4>
        }

        const shownNotes = searchResult.length===0 ? notes : searchResult;
        return shownNotes.map((note) => {
            return <SingleNote key={note.id} id={note.id} title={note.title} content={note.content} deleteNote={this.deleteNote}/>
        })
    }

    handleSearchValue(event) {
        const value = event.target.value;
        this.setState({searchValue: value})
        const { notes } = this.state;
        const result = notes.filter((note) => {
            return note.title.toLowerCase().includes(value.toLowerCase())
        })
        this.setState({searchResult: result})
    }

    render() {
        return (
            <div>
                <Navbar addNewNote={this.addNewNote}/>
                <div className="row container">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">search</i>
                        <input id="icon_prefix" type="text" className="validate" onChange={this.handleSearchValue} value={this.state.searchValue}/>
                        <label htmlFor="icon_prefix">Find by title</label>
                    </div>
            
                </div>
                <div className="row container">
                    {this.renderNotes()}
                </div>
            </div>
        )
    }
}

export default MainLayout;