import React, { Component } from 'react';

class Result extends Component {

    render() {
        const {result} = this.props;
        return ( 
            <div className="Result">
                {result.original_name || result.original_title}
            </div>
        );
    }
}
 
export default Result;