import React, { Component } from 'react';
import SearchForm from './SearchForm';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const tabList = tabs.map(t => {
            return(
                <li className={activeTab === t.name ? 'active' : ''} name={t.name} onClick={this.handleTabClick} >
                    {t.name}
                </li>
            )
        });
        return (
            <nav className="navbar">
                <a href="/" className="logo">
                    Floobie
                </a>
                <ul className="tab-list">
                    {tabList}
                    <SearchForm performSearch={this.performSearch} />
                </ul>
            </nav>
        )
    }
}
 
export default Navigation;