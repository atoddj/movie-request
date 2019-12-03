import React, { Component } from 'react';

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isEditing: false
         }
         this.handleDelete = this.handleDelete.bind(this);
    }
    
    handleDelete() {
        this.props.handleDelete(this.props.id);
    }

    render() { 
        return ( 
            <div className="Request">
                {this.props.name}
                {this.props.admin && 
                    <div className="Request-admin">
                        <span className="Request-edit">
                            edit
                        </span>
                        <span className="Request-delete" onClick={this.handleDelete}>
                            delete
                        </span>
                    </div>
                }
            </div>
         );
    }
}
 
export default Request;