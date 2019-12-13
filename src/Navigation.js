import React, { Component } from 'react';
import SearchForm from './SearchForm';
import './Navigation.css';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(e) {
        const {handleClick} = this.props;
        handleClick(e);
    }

    render() {
        const {tabs, activeTab} = this.props;
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
                    <SearchForm performSearch={this.props.performSearch} />
                </ul>
            </nav>
        )
    }
}
 
export default Navigation;