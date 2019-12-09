import React, { Component } from 'react';

class Result extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const {postNewRequest, result} = this.props;
        postNewRequest(result);
    }

    render() {
        const {result} = this.props;
        const relDate = result.release_date ? new Date(result.release_date).getFullYear() : null;
        const firstAirDate = result.first_air_date ? new Date(result.first_air_date).getFullYear() : null;
        const isPending = result.status === "pending";
        const isAvailable = result.status === 'Available';
        const seasons = result.seasons ? result.seasons.map(s => (<span className="Result-season">{s}</span>)) : '';
        return ( 
            <div className="Result">
                <div className="media-card">
                    <div className="media-header">
                        <img src={`//image.tmdb.org/t/p/w92/${result.poster_path}`} alt={`Poster for ${result.name || result.title}`} />
                        <h2>{result.name || result.title}</h2>
                        {result.media_type && <span>{result.media_type},</span>}
                        {(relDate||firstAirDate) && <span> {relDate||firstAirDate}</span>}
                        {seasons && 
                            <div className="Result-seasons">
                                {seasons}
                            </div>
                        }
                    </div>
                    <div className="media-desc">
                        <p>{result.overview}</p>
                    </div>
                    <div className="media-card-button">
                        {(!isAvailable && !isPending) && 
                            <button className="Result-button" disabled={isPending} onClick={this.handleClick} >{isPending ? 'Pending' : 'Request'}</button>
                        }
                        {isPending && 
                            <div className="Result-pending"><i className="fas fa-exclamation-triangle"></i> Request Pending</div>
                        }
                        {isAvailable &&
                            <div className="Result-available"><i className="fas fa-check-circle"></i> Available for streaming</div>
                            
                        }
                    </div>
                </div>
                <div className="blur-back" style={{backgroundImage: `url('//image.tmdb.org/t/p/original${result.backdrop_path}')`}}></div>
            </div>
        );
    }
}
 
export default Result;