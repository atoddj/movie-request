import React, { Component } from 'react';
import SearchForm from './SearchForm';
import Result from './Result';
import RequestList from './RequestList';
import './Search.css';

import Axios from 'axios';

const TMDB_URL = 'http://localhost:4000/search'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchResults: [], 
            resultsLoaded: false,
            activeTab: 'pending requests',
            tabs: [{name: "pending requests", status: "pending"}, {name: 'fulfilled requests', status: "complete"}]
        }
        this.performSearch = this.performSearch.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    async performSearch(query) {
        const tmdbRes = await Axios.get(TMDB_URL, {
            params: {q: query}
        })
        this.setState(st => ({
            searchResults: tmdbRes.data.results,
            resultsLoaded: true,
            tabs: st.tabs.length === 2 ? [{name: 'search', status: 'done'}, ...st.tabs] : st.tabs,
            activeTab: 'search'
        }))
    }

    handleTabClick(e) {
        this.setState({
            activeTab: e.target.getAttribute('name')
        })
    }

    render() {
        const {searchResults,resultsLoaded,tabs,activeTab} = this.state;
        const resultList = searchResults.filter(r => {
            return r.media_type !== 'person'
        }).map(r => (
            <Result result={r} />
        ));
        const tabList = tabs.map(t => {
            return(
                <li className={activeTab === t.name ? 'active' : ''} name={t.name} onClick={this.handleTabClick} >
                    {t.name}
                </li>
            )
        });

        const tabContent = tabs.filter(t=> (t.name === activeTab)).map(t => {
            if(t.name === 'search') {
                return ( 
                    <div className="Search-results">
                        {resultList}
                    </div>
                    )
            } else {
                return <RequestList key={t.status} status={t.status} />
            }
        });

        return ( 
            <div className="Search">
                <SearchForm performSearch={this.performSearch} />
                <ul className="tab-list">
                    {tabList}
                </ul>
                {tabContent}
                
            </div>
         )
    }
}
 
export default Search;