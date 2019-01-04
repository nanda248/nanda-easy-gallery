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

    handleSubmit(event) {
        event.preventDefault();
        const { title, content } = this.state;
        if(this.state.textOverLimit || this.state.titleOverLimit) {
            swal({
                text: 'Number of words is more than 30.',
                icon: 'error'
            })
        }
        else if(title === "" || content === "") {
            swal({
                text: 'Title or Content is empty. Please fill in and add again.',
                icon: 'error'
            })
        } else {
            this.setState({ title: "", content: ""})
            this.props.addNewNote(title,content)
        }
    }

    render() {
        return(
            <nav style={{background: '#464954'}}>
                <div>
                <div className="brand-logo" style={{marginLeft: '10px'}}>
                    <img src="sticky_note_logo.png" alt="sticky note logo" className="img-responsive" style={{width: '40px'}} /> &nbsp;Sticky Note
                </div>
                <ul className="right hide-on-med-and-down">
                    <li><button data-target="modal1" className="btn modal-trigger" style={{background: '#7D89BC', marginRight: '10px'}}>Add New Note</button></li>
                </ul>
                </div>

                {/* modal */}
                <div id="modal1" className="modal">     
                    <h4 style={{color: colors.darkOrange, textAlign: 'center', marginTop: '10px'}}>Add New Note</h4>  
                    <form onSubmit={this.handleSubmit}>    
                    <div className="container">
                        
                        <label>
                            Title: (Max 10 words) {this.state.titleOverLimit ? <span style={{color: 'red'}}>Over Limit</span> : ''}
                            <input type="text" value={this.state.title} onChange={this.handleChangeTitle} />
                        </label>

                        <label>
                            Content: (Max 30 words) {this.state.textOverLimit ? <span style={{color: 'red'}}>Over Limit</span> : ''}
                            <textarea value={this.state.content} onChange={this.handleChangeContent} />
                        </label>

                    </div>

                    <div className="modal-footer" style={{textAlign: 'center', paddingBottom: '50px'}}>
                        <a href="#" className="modal-close waves-effect btn">Cancel</a> &nbsp;
                        <a href="#" className="waves-effect btn" onClick={this.handleSubmit.bind(this)}>Add</a>
                    </div>
                    </form>
                </div>

            </nav>
        )
    }
}

export default Navbar;