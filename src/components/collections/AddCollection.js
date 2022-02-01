import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { createCollection } from '../../actions';
import CollectionForm from "./CollectionForm";

import './CollectionForm.css';

class AddCollection extends React.Component {
	onSubmit = async (formValues) => {
		this.props.createCollection(formValues, '/collections');
	}

	render() {
		if (this.props.redirectTo) {
			return <Redirect to={this.props.redirectTo} />
		} else {
			return <CollectionForm onSubmit={this.onSubmit} formHeader="Add a new collection"/>
		}
	}
}

const mapStateToProps = (state) => {
	return {
		redirectTo: state.redirectTo
	}
}

export default connect(
	mapStateToProps,
	{ createCollection }
)(AddCollection);