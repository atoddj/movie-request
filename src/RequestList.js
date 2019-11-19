import React, { Component } from 'react';
import Request from './Request';
import axios from 'axios';

const REQUEST_URL = 'http://localhost:4000/requests?status=pending'

class RequestList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoaded: false,
            requests: null
        }
    }

    async componentDidMount() {
       let requests = await axios.get(REQUEST_URL);
       this.setState({requests: requests.data, isLoaded: true});
    }

    render() { 
        const {requests, isLoaded} = this.state;
        const list = requests.map(item => (
            <Request 
                name={item.movie_name}
            />
        ));
        console.log(this.state.requests);
        return ( 
            <div className="RequestList">
                <h2>List</h2>
                {isLoaded && list}
            </div>
         )
    }
}
 
export default RequestList;