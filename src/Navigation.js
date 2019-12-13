import React, { Component } from "react";
import SearchForm from "./SearchForm";
import "./Navigation.css";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
    this.handleTabClick = this.handleTabClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleTabClick(e) {
    const { handleClick } = this.props;
    handleClick(e);
  }

  toggleMenu() {
    this.setState(st => ({
      isMenuOpen: !st.isMenuOpen
    }));
  }

  render() {
    const { tabs, currentTab } = this.props;
    const { isMenuOpen } = this.state;
    const tabList = tabs.map(t => {
      let classList = "item";
      if (currentTab === t.name) {
        classList += " current";
      }
      if (isMenuOpen) {
        classList += " active";
      }
      return (
        <li className={classList} name={t.name} onClick={this.handleTabClick}>
          {t.name}
        </li>
      );
    });
    return (
      <nav>
        <ul className="menu">
          <li className="logo">Floobie</li>
          {tabList}
          <li className="toggle">
            <i
              className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}
              onClick={this.toggleMenu}
            />
          </li>
          <SearchForm performSearch={this.props.performSearch} />
        </ul>
      </nav>
    );
  }
}

export default Navigation;
