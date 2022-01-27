import React from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import { signOut } from '../../actions';

import './UnsplashAuth.css';

const redirectUrl = encodeURIComponent("http://localhost:3000/auth");
const oauthAuthorizeUrl = "http://localhost:3001/oauth/authorize";
const responseType = "code"

class UnsplashAuth extends React.Component {
	state = {
		isSignedIn: false,
		attemptSignIn: false
	};

	generateAuthorizeUrl(redirectUrl) {
		let queryStrings = 
		`redirect_uri=${redirectUrl}&response_type=${responseType}`;

		return `${oauthAuthorizeUrl}?${queryStrings}`;
	}

	componentDidMount() {
		
	};

	onSignInClick = () => {
		// Redirect to Authorize URL
		this.setState({
			attemptSignIn: true
		})

		/* this.setState({
			isSignedIn: true
		}) */
		
	}

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
				<a href={this.generateAuthorizeUrl(redirectUrl)} >
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