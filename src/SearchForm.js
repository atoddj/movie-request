import React, { Component } from 'react';

class SearchForm extends Component {
    constructor(props){
        super(props);
        this.state = { query: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const {query} = this.state;
        e.preventDefault();
        this.props.performSearch(query);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {query} = this.state;
        return ( 
            <div className="SearchForm">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="query-input"></label>
                    <input type="text" name="query" id="query-input" placeholder="Search" onChange={this.handleChange} value={query} />
                    <button className="SearchForm-submit"><i class="fas fa-search"></i></button>
                </form>
            </div>
         )
    }
}
 
export default SearchForm;