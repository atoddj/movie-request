import React, { Component } from 'react';

class Result extends Component {

    render() {
        const {result} = this.props;
        const relDate = result.release_date ? new Date(result.release_date).getFullYear() : null;
        return ( 
            <div className="Result">
                <div className="media-card">
                    <div className="media-header">
                        <img src={`//image.tmdb.org/t/p/w92/${result.poster_path}`} alt={`Poster for ${result.original_name || result.original_title}`} />
                        <h2>{result.original_name || result.original_title}</h2>
                        {relDate && 
                            <span>{relDate}</span>
                        }
                    </div>
                    <div className="media-desc">
                        <p>{result.overview}</p>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Result;