import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="Modal">
                {this.props.children}
            </div>
         )
    }
}
 
export default Modal;