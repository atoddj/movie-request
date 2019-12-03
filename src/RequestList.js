import React, { Component } from 'react';
import Request from './Request';
import Axios from 'axios';
import './RequestList.css';

const REQUESTS_URL = 'http://localhost:4000/requests'

class RequestList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoaded: false,
            requests: []
        }
        this.getDbInfo = this.getDbInfo.bind(this);
        this.deleteRequest = this.deleteRequest.bind(this);
    }

    async componentDidMount() {
       let requests = await Axios.get(`${REQUESTS_URL}?status=${this.props.status}`);
       this.setState({requests: requests.data, isLoaded: true});
       this.getDbInfo();
    }

    async getDbInfo() {
        const {isLoaded} = this.state;
        if (isLoaded) {
            this.setState(st => ({
                requests: st.requests.map(r => ({...r, poster_image: r._id, background_image: r._id}))
            }))
        }
    }

    async deleteRequest(id) {
        const dbDelete = await Axios.delete(`${REQUESTS_URL}/${id}`, {data: {admin: this.props.token}});
        if (dbDelete.data.deleted) {
            this.setState(st => ({
                requests: st.requests.filter(r => r._id !== id)
            }));
        }
    }

    render() { 
        const {requests, isLoaded} = this.state;
        const list = requests.map(item => (
            <Request key={item._id} id={item._id} name={item.movie_name} admin={this.props.admin} handleDelete={this.deleteRequest} />
        ));
        return ( 
            <div className="RequestList">
                {isLoaded && list}
            </div>
         )
    }
}
 
export default RequestList;