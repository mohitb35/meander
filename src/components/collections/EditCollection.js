import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { updateCollection, fetchCollection } from '../../actions';
import CollectionForm from "./CollectionForm";

import './CollectionForm.css';

class EditCollection extends React.Component {
	componentDidMount() {
		if (!this.props.collection){
			this.props.fetchCollection(this.props.match.params.id);
		}
	}

	onSubmit = (formValues) => {
		this.props.updateCollection(this.props.collection.id, formValues, "/collections");
	}

	render() {
		if (this.props.redirectTo) {
			return <Redirect to={this.props.redirectTo} />
		} 

		if (!this.props.collection) {
			return <div>Loading...</div>
		}

		let initialValues = {
			title: this.props.collection.title,
			description: this.props.collection.description,
			private: this.props.collection.private
		}

		return <CollectionForm 
			onSubmit={this.onSubmit} 
			formHeader="Edit collection"
			initialValues={initialValues}
		/>
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		collection: state.collectionResults.collections[ownProps.match.params.id],
		redirectTo: state.redirectTo
	}
}

export default connect(
	mapStateToProps,
	{ updateCollection, fetchCollection }
)(EditCollection);