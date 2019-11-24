import React, { Component } from 'react';

class Result extends Component {

    render() {
        const {result} = this.props;
        return ( 
            <div className="Result">
                <div className="media-card">
                    <div className="media-header">
                        <img src={`//image.tmdb.org/t/p/w92/${result.poster_path}`} alt={`Poster for ${result.original_name || result.original_title}`} />
                        <h2>{result.original_name || result.original_title}</h2>
                    </div>
                </div>
                
                
            </div>
        );
    }
}
 
export default Result;