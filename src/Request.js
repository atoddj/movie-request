import React, { Component } from 'react';

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isEditing: false
         }
    }
    render() { 
        return ( 
            <div className="Request">
                {this.props.name}
                {this.props.admin && 
                    <span className="Request-edit">
                        edit
                    </span>
                }
            </div>
         );
    }
}
 
export default Request;