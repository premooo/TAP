import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';
import LogoW from '../assets/images/LogoW.png';
import Contact from '../pages/Contact'

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };

  render() {
    const { isMenuOpen } = this.state;

    return (
      <div className="header-container">
        <div className="header-Img">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={this.toggleMenu} 
          >
          <img src={LogoW} alt="TAP LOGO" />
          </NavLink>
        </div>
        <button
          className="hamburger-menu"
          onClick={this.toggleMenu}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
        <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
          <button
            className="close-menu"
            onClick={this.toggleMenu}
            aria-label="Close Menu"
          >
            ✕
          </button>
          <ul>
            <li>
              <NavLink
                to="/project/list"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={this.toggleMenu} // Close menu after navigating
              >
                Project
              </NavLink>
            </li>
            <li>
             <a
                href="#about"
                className="menu-link"
                onClick={this.toggleMenu}
              >
                About
              </a>
            </li>
            <li>
             <a
                href="#career"
                className="menu-link"
                onClick={this.toggleMenu}
              >
                Career
              </a>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={this.toggleMenu}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
