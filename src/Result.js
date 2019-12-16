import React, { Component } from "react";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false, showObject: {} };

    this.handleClick = this.handleClick.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  handleClick() {
    const { postNewRequest, result } = this.props;
    postNewRequest(result);
  }

  openModal() {
    //perform new api call to show endpoint
    //set open modal state
    this.setState({ isModalOpen: true, showObject: { title: String, numSeasonsAvailable: Array, numSeasonsReady: Array } });
  }

  render() {
    const { result } = this.props;
    const { isModalOpen, showObject } = this.state;
    const relDate = result.release_date
      ? new Date(result.release_date).getFullYear()
      : null;
    const firstAirDate = result.first_air_date
      ? new Date(result.first_air_date).getFullYear()
      : null;
    const isPending = result.status === "pending";
    const isAvailable = result.status === "Available";
    const seasons = result.seasons
      ? result.seasons.map(s => <span className="Result-season">{s}</span>)
      : "";

    const isTvShow = result.media_type === "tv";

    let button;

    if (!isAvailable && !isPending) {
      button = (
        <button className="Result-button" onClick={this.handleClick}>
          Request
        </button>
      );
    } else if (isPending) {
      button = (
        <div className="Result-pending">
          <i className="fas fa-exclamation-triangle"></i> Request Pending
        </div>
      );
    } else if (isAvailable) {
      button = (
        <div className="Result-available">
          <i className="fas fa-check-circle"></i> Available for streaming
        </div>
      );
    }

    if (isTvShow) {
      // update button to new button to open a modal if it's a tv show
      button = (
        <button className="Result-button" onClick={this.openModal}>
          Request...
        </button>
      );
    }

    return (
      <div className="Result">
        <div className="media-card">
          <div className="media-header">
            <img
              src={`//image.tmdb.org/t/p/w92/${result.poster_path}`}
              alt={`Poster for ${result.name || result.title}`}
            />
            <h2>{result.name || result.title}</h2>
            {result.media_type && <span>{result.media_type},</span>}
            {(relDate || firstAirDate) && (
              <span> {relDate || firstAirDate}</span>
            )}
            {seasons && <div className="Result-seasons">{seasons}</div>}
          </div>
          <div className="media-desc">
            <p>{result.overview}</p>
          </div>
          <div className="media-card-button">{button}</div>
        </div>
        <div
          className="blur-back"
          style={{
            backgroundImage: `url('//image.tmdb.org/t/p/original${result.backdrop_path}')`
          }}
        ></div>
        {isModalOpen && <div className="Modal"></div>}
      </div>
    );
  }
}

export default Result;
