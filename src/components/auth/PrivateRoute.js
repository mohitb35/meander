import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import './PrivateRoute.css';

import { generateAuthorizeUrl } from "../../utils";

const renderLogin = () => {
	return (
		<div className="login-needed-message">
			<p>You must log in to access this feature.</p>
			<a href={generateAuthorizeUrl()} >
				<button className="auth-button">
					Login with Unsplash
				</button>
			</a>
		</div>
	)
}

const PrivateRoute = (props) => {
	const { component: Component, isSignedIn, ...rest } = props;

	return (
		<Route 
			{...rest} 
			render={(props) => {
				if (isSignedIn) {
					return <Component {...props} />
				} else {
					return renderLogin()
				}	 
			}} 
		/>
	)
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn
	}
}

export default connect(
	mapStateToProps
)(PrivateRoute);