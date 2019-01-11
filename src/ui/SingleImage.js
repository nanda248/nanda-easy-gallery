import React, { Component } from 'react';
import colors from '../data/colors';
import './layout.css';
import swal from 'sweetalert';

class SingleImage extends Component {

    handleDelete(id) {
        swal({
            title: "Are you sure you want to delete this note?",
            icon: "warning",
            buttons: {
                Yes: true,
                No: true,
              }
          }).then((value) => {
            if(value === "Yes") {
                this.props.deleteNote(id);
            }
          })
    }

    render() {
        const {title, content, id} = this.props;
        return (
            <div class="col s3" >
                    <div class="card" style={{background: colors.purpleRed, height: 'auto'}}>
                        <div class="card-content white-text">
                            <span class="card-title">{title}</span>
                            <p>{content}</p>
                        </div>
                        <div class="card-action">
                            <a href="#" className="btn-flat" onClick={this.handleDelete.bind(this, id)}>Delete</a>
                        </div>
                    </div>
            </div>
        )
    }
}

export default SingleImage;