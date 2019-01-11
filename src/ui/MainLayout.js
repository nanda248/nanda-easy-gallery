import React, { Component } from 'react';
import SingleImage from './SingleImage';
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
        this.handleSearchValue = this.handleSearchValue.bind(this);
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
        .catch((error) => {
            console.log(error);
        })
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
                    {this.renderImages()}
                </div>
            </div>
        )
    }
}

export default MainLayout;