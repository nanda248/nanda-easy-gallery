import React, {Component} from 'react';
import colors from '../data/colors';
import './layout.css';
class Navbar extends Component {

    render() {
        return(
            <div className="navbar-fixed">
            <nav style={{background: '#5A6974'}}>
                <div className="nav-wrapper">
                    <a className="brand-logo" style={{marginLeft: '10px'}} href="#">
                        <img 
                            src="gallery_logo.png" 
                            alt="sticky note logo" 
                            className="img-responsive" 
                            style={{width: '40px'}} /> 
                        &nbsp;
                        <span style={{color: colors.textColor, fontWeight: '150'}}>Gallery</span>
                        <span style={{fontFamily: 'cursive'}}>  Easy</span>
                    </a>
                </div>
            </nav>
            </div>
        )
    }
}

export default Navbar;