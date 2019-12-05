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
        const {movie_name, mediatype, year, backdrop_path, poster_path, overview} = this.props.item;
        return ( 
            <div className="Result">
                <div className="media-card">
                    <div className="media-header">
                        <img src={`//image.tmdb.org/t/p/w92/${poster_path}`} alt={`Poster for ${movie_name}`} />
                        <h2>{movie_name}</h2>
                        {mediatype && <span>{mediatype},</span>}
                        {year && <span> {year}</span>}
                    </div>
                    <div className="media-desc">
                        <p>{overview}</p>
                    </div>
                    <div className="media-card-button">
                    </div>
                </div>
                <div className="blur-back" style={{backgroundImage: `url('//image.tmdb.org/t/p/original${backdrop_path}')`}}></div>
            </div>
         );
    }
}
 
export default Request;