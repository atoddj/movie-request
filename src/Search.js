import React, { Component } from 'react';

import Navigation from './Navigation';
import Result from './Result';
import RequestList from './RequestList';
import './Search.css';

import Axios from 'axios';

const TMDB_URL = '/api/search';
const AUTH_URL = '/api/auth';
const REQUESTS_URL = '/api/requests';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchResults: [],
            isLoggedIn: false,
            token: '',
            activeTab: 'pending',
            tabs: [{name: "pending", status: "pending"}, {name: 'fulfilled', status: "complete"}]
        }
        this.performSearch = this.performSearch.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.postNewRequest = this.postNewRequest.bind(this);
    }

    async componentDidMount() {
        if (window.location.search) {
            const authRes = await Axios.get(`${AUTH_URL}${window.location.search}`);
            this.setState({...authRes.data, token: window.location.search.split('=')[1]});
            window.history.pushState(null, '', '/');
        }
    }

    async performSearch(query) {
        if(query) {
            const tmdbRes = await Axios.get(TMDB_URL, {
                params: {q: query}
            });
            this.setState(st => ({
                searchResults: tmdbRes.data.results,
                tabs: st.tabs.length === 2 ? [{name: 'search', status: 'done'}, ...st.tabs] : st.tabs,
                activeTab: 'search'
            }));
        }
    }

    handleTabClick(e) {
        this.setState({
            activeTab: e.target.getAttribute('name')
        })
    }

    async postNewRequest(searchObj) {
        const tmdbPost = await Axios.post(REQUESTS_URL, searchObj);
        if (tmdbPost.data.success) {
            this.setState(st => ({
                searchResults: st.searchResults.map(r => r.id === searchObj.id ? {...r, status: tmdbPost.data.status} : r)
            }));
        }
    }

    render() {
        const {searchResults,tabs,activeTab,isLoggedIn,token} = this.state;
        const resultList = searchResults.filter(r => (r.media_type !== 'person')).map(r => (<Result result={r} postNewRequest={this.postNewRequest} />));

        const tabContent = tabs.filter(t=> (t.name === activeTab)).map(t => {
            if(t.name === 'search') {
                return ( 
                    <div className="Search-results">
                        <h1>Search Results</h1>
                        {resultList}
                    </div>
                    )
            } else {
                return <RequestList key={t.status} status={t.status} admin={isLoggedIn} token={token} />
            }
        });

        return ( 
            <div className="Search">
                <Navigation tabs={tabs} activeTab={activeTab} handleClick={this.handleTabClick} performSearch={this.performSearch} />
                {tabContent}
            </div>
         )
    }
}
 
export default Search;