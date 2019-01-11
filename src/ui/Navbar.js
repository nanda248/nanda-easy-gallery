import React, {Component} from 'react';
import M from "materialize-css";
import colors from '../data/colors';
import swal from 'sweetalert';

class Navbar extends Component {

    constructor() {
        super()
        this.state = {
            title: "",
            content: "",
            textOverLimit: false,
            titleOverLimit: false
        }
        this.handleChangeTitle = this.handleChangeTitle.bind(this)
        this.handleChangeContent = this.handleChangeContent.bind(this)
    }

    componentDidMount() {
        M.AutoInit();
    }
    
    handleChangeTitle(event) { 
        const value = event.target.value;
        const numOfWords = value.split(' ').length
        if(numOfWords > 10) {
            this.setState({titleOverLimit: true})
        } else {
            this.setState({titleOverLimit: false})
        }
        this.setState({title: value}) 
    }

    handleChangeContent(event) { 
        const value = event.target.value;
        const numOfWords = value.split(' ').length
        if(numOfWords > 30) {
            this.setState({textOverLimit: true})
        } else {
            this.setState({textOverLimit: false})
        }
        this.setState({content: value}); 
    }

    render() {
        return(
            <nav style={{background: '#464954'}}>
                <div>
                <div className="brand-logo" style={{marginLeft: '10px'}}>
                    <img src="gallery_logo.png" alt="sticky note logo" className="img-responsive" style={{width: '40px'}} /> 
                    &nbsp;My Gallery App
                </div>
                <ul className="right hide-on-med-and-down">
                    <li><button className="btn" style={{background: '#7D89BC', marginRight: '10px'}}>Add New Note</button></li>
                </ul>
                </div>

                

            </nav>
        )
    }
}

export default Navbar;