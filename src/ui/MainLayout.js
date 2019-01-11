import React, { Component } from 'react';
import SingleNote from './SingleNote';
import data from '../data/sampleData';
import swal from 'sweetalert';
import Navbar from './Navbar';
import axios from 'axios';
import GifPlayer from 'react-gif-player';

class MainLayout extends Component {

    constructor() {
        super()
        this.state = {
            notes: data,
            searchValue: '',
            searchResult: [],
            images: null
        }

        this.addNewNote = this.addNewNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.handleSearchValue = this.handleSearchValue.bind(this);
    }

    componentDidMount() {
        // axios.get(`https://api.giphy.com/v1/gifs/search`,{
        //     params: {
        //         api_key: 'pDGxHY4YaW5bLvNNXt0SSxJnK1z0y9Z3',
        //         q: 'liverpool'
        //     }
        // })
        // .then(res => {
        //     console.log("successful res: ", res.data)
        //     const images = res.data;
        //     this.setState({ images: images.data });
        // })
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

    renderImages() {
        const { images } =this.state;
        if(images === null) {
            return <h4>Nothing to show here</h4>
        } else {
            return images.map((image, index) => {
                console.log("downsized image:" , image.images.downsized.url)
                return (
                    <div className="col s3" key={index} style={{height: '200px'}}>
                        {/* <GifPlayer src={image.images.downsized} /> */}
                        <img src={image.images.fixed_width.url} alt={image.title} />
                    </div>
                )
            })
        }
    }

    handleSearchValue(event) {
        const value = event.target.value;
        this.setState({searchValue: value})
        // const { notes } = this.state;
        // const result = notes.filter((note) => {
        //     return note.title.toLowerCase().includes(value.toLowerCase())
        // })
        // this.setState({searchResult: result})
        axios.get(`https://api.giphy.com/v1/gifs/search`,{
            params: {
                api_key: 'pDGxHY4YaW5bLvNNXt0SSxJnK1z0y9Z3',
                q: value
            }
        })
        .then(res => {
            console.log("successful res: ", res.data)
            const images = res.data;
            this.setState({ images: images.data });
        })
    }

    render() {
        console.log("Images: ", this.state.images)
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
                    {/* {this.renderNotes()} */}
                    {this.renderImages()}
                </div>
            </div>
        )
    }
}

export default MainLayout;