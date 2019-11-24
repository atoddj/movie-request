import React, { Component } from 'react';

// TODO: 
// Figure out a way to get status.
// e.g.: if the search result exists in:
// a) the request list (as pending) - show 'pending' flag, disable request button
// b) the plex library - show 'available' flag, hide request button
// c) neither a nor b - show and enable request button

class Result extends Component {

    render() {
        const {result} = this.props;
        const relDate = result.release_date ? new Date(result.release_date).getFullYear() : null;
        const firstAirDate = result.first_air_date ? new Date(result.first_air_date).getFullYear() : null;
        return ( 
            <div className="Result">
                <div className="media-card">
                    <div className="media-header">
                        <img src={`//image.tmdb.org/t/p/w92/${result.poster_path}`} alt={`Poster for ${result.original_name || result.original_title}`} />
                        <h2>{result.original_name || result.original_title}</h2>
                        {result.media_type && <span>{result.media_type},</span>}
                        {(relDate||firstAirDate) && <span> {relDate||firstAirDate}</span>}
                    </div>
                    <div className="media-desc">
                        <p>{result.overview}</p>
                    </div>
                    <div className="media-card-button">
                        <button className="Result-button">Request</button>
                    </div>
                </div>
                <div className="blur-back" style={{backgroundImage: `url('//image.tmdb.org/t/p/original${result.backdrop_path}')`}}></div>
            </div>
        );
    }
}
 
export default Result;