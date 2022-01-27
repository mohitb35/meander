import React from "react";
import qs from 'qs';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { fetchAccessToken, signIn, failedSignIn } from "../../actions";

class AuthLogic extends React.Component {
	componentDidMount() {
		const queryParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
		if (queryParams.code) {
			this.props.fetchAccessToken(queryParams.code);
		} else if (queryParams.error) {
			this.props.failedSignIn(queryParams)
		} else {
			this.props.failedSignIn({
				error: "Invalid request",
				error_description: "The request made was invalid"
			})
		}
	}

	render() {
		return (
			<Redirect to={"/"}/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		accessToken: state.auth.accessToken,
		accessError: state.auth.accessError
	}
}

export default connect(
	mapStateToProps,
	{ fetchAccessToken, signIn, failedSignIn }
)(AuthLogic);