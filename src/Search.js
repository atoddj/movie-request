import React, { Component } from 'react';
import SearchForm from './SearchForm';
import Result from './Result';

import Axios from 'axios';

const TMDB_URL = 'http://localhost:4000/search'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { searchResults: [], resultsLoaded: false }
        this.performSearch = this.performSearch.bind(this);
    }

    async performSearch(query) {
        const tmdbRes = await Axios.get(TMDB_URL, {
            params: {q: query}
        })
        this.setState({
            searchResults: tmdbRes.data.results,
            resultsLoaded: true
        })
    }

    render() {
        const {searchResults,resultsLoaded} = this.state;
        const resultList = searchResults.filter(r => {
            return r.media_type !== 'person'
        }).map(r => (
            <Result result={r} />
        ));

        return ( 
            <div className="Search">
                <SearchForm performSearch={this.performSearch} />
                {resultsLoaded && 
                    <div className="Search-results">
                        {resultList}
                    </div>
                }
                
            </div>
         )
    }
}
 
export default Search;