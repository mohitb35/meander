import React from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import { signOut } from '../../actions';
import { generateAuthorizeUrl } from '../../utils';

import './UnsplashAuth.css';

class UnsplashAuth extends React.Component {
	onSignOutClick = () => {
		this.props.signOut();
	}

	renderAuthButton() {
		// Check is user is signed in (based on state)
		if (this.props.isSignedIn) {
			return (
				<button className="auth-button" onClick={this.onSignOutClick}>
					Logout
				</button>
			)
		} else {
			return(
				<a href={generateAuthorizeUrl()} >
					<button className="auth-button">
						Login with Unsplash
					</button>
				</a>
			);
		}
	}

	render() {
		return (
			<div>{this.renderAuthButton()}</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn
	}
}

export default connect( 
	mapStateToProps,
	{ signOut }
)(UnsplashAuth);