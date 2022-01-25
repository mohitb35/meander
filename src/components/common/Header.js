import React from "react";
import { Link } from "react-router-dom";

import './Header.css';
import logo from '../../assets/logo-icon-2x.png';

class Header extends React.Component {
	state = {
		isMenuOpen: false
	}

	toggleMenu = () => {
		this.setState({
			isMenuOpen: !(this.state.isMenuOpen)
		})
	}

	render() {
		const navMenuClasses = `nav-menu ${this.state.isMenuOpen ? 'open' : ''}`;
		const menuButtonClasses = `btn-menu ${this.state.isMenuOpen ? 'open' : ''}`;
		return (
			<header>
				<div className="nav-first">
					<div className="brand">
						<img src={logo} className="brand-image" alt="brand-logo"/>
						<span className="brand-name">Meander</span>
					</div>
					<div className={menuButtonClasses} id="btn-menu" onClick={this.toggleMenu}>
						<span className="btn-menu-label">Menu</span>
						<span className="menu-icon"></span>
					</div>
				</div>
				<nav className={navMenuClasses} id="nav-menu">
					<ul className="nav-link-container">
						<li className="nav-link">
							<Link to="/">Search</Link>
						</li>
						<li className="nav-link">
							<Link to="/collections">Collections</Link>
						</li>
						<li className="nav-link">
							<Link to="/liked">Liked</Link>
						</li>
						<li className="nav-link">
							<Link to="/">Login</Link>
						</li>
					</ul>
				</nav>	
			</header>
		)
	}
}

export default Header;