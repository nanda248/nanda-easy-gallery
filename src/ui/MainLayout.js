import React, { Component } from 'react';
import swal from 'sweetalert';
import Navbar from './Navbar';
import axios from 'axios';
import Preloader from './Preloader';
import {api_key, getGiphyImages} from '../data/api';
import './layout.css';
class MainLayout extends Component {

    constructor() {
        super()
        this.state = {
            searchValue: '',
            searchResult: [],
            images: null,
            searchType: 'image',
            searchingPreloader: false,
            numOfImages: 8,
            showIcon: [],
            favorites: []
        }
        this.handleSearchValue = this.handleSearchValue.bind(this);
        this.handleShowMore = this.handleShowMore.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
    }

    renderImages() {
        const { images, numOfImages } =this.state;
        if(images === null) {
            return <h4>Lightning fast Giphy image search engine.</h4>
        } else {
            return images.slice(0, numOfImages).map((image, index) => {
                const { url } = image.images.fixed_width_still;
                const { id } = image;
                return (
                    <div className="col s6 m3 thumb" 
                        key={index} 
                        onMouseEnter={() => this.setState({showIcon: id})}
                        onMouseLeave={() => this.setState({showIcon: ''})}
                        style={{backgroundImage: `url(${url})`}} >
                        {
                            this.state.showIcon === id ?
                            <i className="icon medium material-icons" 
                                style={{color: '#D49BA5'}} 
                                onClick={() => this.handleFavorite(id)}>favorite</i> : <span />
                        }
                        {
                            this.state.favorites.find(item=> item===id) ?  
                            <i className="icon medium material-icons" 
                                style={{color: '#D93654'}} 
                                onClick={() => this.handleFavorite(id)}>favorite</i> : <span />
                        }
                        
                    </div>
                )
            })
        }
    }

    checkFavImg(id) {
        const foundId = this.findImageById(id)
        if(foundId === -1) {
            return false;
        }
        // console.log("returning true: ", foundId)
        return true
    }

    renderShowMoreLessBtn() {
        return (
            <center>
                <a className="waves-effect waves-teal btn-flat blue lighten-4" onClick={this.handleShowMore}>
                    { this.state.numOfImages === 8 ? 'Fetch More' : 'Show Less' }
                </a>
            </center>
        )
    }

    findImageById(id) {
        this.state.favorites.map((storedId) =>{
            if(storedId === id) {
                return storedId;
            }
        })
        return -1;
    }

    handleFavorite(id) {
        swal('You have chosen ' + this.state.searchValue + ' image as your favorite.', "", "success");
        const foundId = this.findImageById(id);
        if(foundId === -1) {
            this.setState({favorites: [...this.state.favorites, id]})
        } else {
            this.setState({favorites: this.state.favorites.filter((favId) => {
                return foundId !== favId
            })})
        }
    }

    handleSearchValue(event) {
        const value = event.target.value;
        this.setState({searchValue: value, searchingPreloader: true})
        axios.get(getGiphyImages,{
            params: {
                api_key: api_key,
                q: value
            }
        })
        .then(res => {
            console.log("successful res: ", res.data)
            const images = res.data;
            this.setState({ images: images.data, searchingPreloader: false });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleShowMore() {
        if(this.state.numOfImages === 8) {
            this.setState({numOfImages: 16})
        } else {
            this.setState({ numOfImages: 8})
        }
    }

    render() {
        return (
            <div>
                <Navbar addNewNote={this.addNewNote}/>
                <div className="row container">
                    <br />
                    
                    <div className="input-field col s12">               
                        <i className="material-icons prefix">search</i>
                        <input id="search_image" type="text" onChange={this.handleSearchValue} value={this.state.searchValue}/>
                        <label htmlFor="search_image">Start Searching For Images!</label>
                    </div>
                    { this.state.searchingPreloader ? <center><Preloader/></center> : <span/> }
                </div>
                <div className="row container">
                    {this.renderImages()}
                </div>
                {this.state.images !== null && this.state.images.length > 8 ? this.renderShowMoreLessBtn() : ''}
            </div>
        )
    }
}

export default MainLayout;