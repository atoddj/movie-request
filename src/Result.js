import React, { Component } from "react";
import Axios from "axios";
import Modal from "./Modal";

const TMDB_TV_URL = '/api/tv/';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false, showObject: {} };

    this.addRequest = this.addRequest.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  addRequest() {
    const { postNewRequest, result } = this.props;
    postNewRequest(result);
  }

  async openModal() {
    const {result} = this.props;
    this.setState({
      isModalOpen: true,
      modalMessage: `Loading information about ${this.props.result.name ||
        this.props.result.title}`
    });
    //   set state for loading icon?

    //perform new api call to show endpoint

    const tmdbTvRes = await Axios.get(`${TMDB_TV_URL}/${result.id}`);
    console.log(tmdbTvRes.data);

    // let response = await Axios.get(endpoint that checks tmdb for total seasons + checks plexdb for which seasons may be available)

    //set open modal state
    this.setState({
      showObject: {
        title: result.name,
        numSeasonsAvailable: tmdbTvRes.data.number_of_seasons,
        numSeasonsReady: Array
      }
    });
  }

  closeModal() {
      this.setState({
          isModalOpen: false,
          modalMessage: '',
          showObject: {}
      })
  }

  render() {
    const { result } = this.props;
    const { isModalOpen, modalMessage, showObject } = this.state;
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
        <button className="Result-button" onClick={this.addRequest}>
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
      <div className="Result" style={ isModalOpen ? { transform:'none', transition: 'none'} : {}} >
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
        {isModalOpen && (
          <Modal>
            {modalMessage && (
              <div className="Modal-loading-message">{modalMessage}</div>
            )}
            <div className="Modal-close" onClick={this.closeModal}><i className="fas fa-times"></i></div>
            <div className="Modal-title"></div>
            <div className="Modal-body">
              Number of seasons: {showObject.numSeasonsAvailable}
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default Result;
