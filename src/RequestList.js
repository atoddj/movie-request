import React, { Component } from 'react';
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
       this.setState({requests: requests.data});
    }

    render() { 
        console.log(this.state.requests);
        return ( 
            <h2>List</h2>
         );
    }
}
 
export default RequestList;