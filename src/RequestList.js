import React, { Component } from 'react';
import Request from './Request';
import axios from 'axios';

const REQUEST_URL = 'http://localhost:4000/requests?status=pending'
const TMDB_URL = 'http://localhost:4000/search'

class RequestList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoaded: false,
            requests: []
        }
        this.getDbInfo = this.getDbInfo.bind(this);
    }

    async componentDidMount() {
       let requests = await axios.get(REQUEST_URL);
       this.setState({requests: requests.data, isLoaded: true});
       this.getDbInfo();
    }

    async getDbInfo() {
        const {isLoaded, requests} = this.state;
        if (isLoaded) {
            requests.every(r => {
                this.setState(st => ({
                    requests: st.requests.map(item => (
                        {...item, poster_image: '', cover_image: ''}
                    ))
                }))
            })
        }
    }

    render() { 
        const {requests, isLoaded} = this.state;
        const list = requests.map(item => (
            <Request key={item._id} name={item.movie_name} />
        ));
        return ( 
            <div className="RequestList">
                {isLoaded && list}
            </div>
         )
    }
}
 
export default RequestList;