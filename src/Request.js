import React, { Component } from 'react';

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="Request">
                {this.props.request.name}
            </div>
         );
    }
}
 
export default Request;