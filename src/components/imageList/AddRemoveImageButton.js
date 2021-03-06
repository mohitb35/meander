import React from "react";
import { connect } from "react-redux";

import { removeImageFromCollection } from "../../actions";

import './AddRemoveImageButton.css';

class AddRemoveImageButton extends React.Component {
	handleAddImage = () => {
		this.props.showAddToCollectionModal(this.props.image);
	}

	handleRemoveImage = () => {
		this.props.removeImageFromCollection(
			this.props.collectionId, 
			this.props.image.id
		);
	}

	renderButton() {
		if (this.props.page === 'collection-details') {
			return (
				<button className="remove-from-collection-button" onClick={this.handleRemoveImage}>
					Remove from collection
				</button>
			)
		} else {
			return (
				<button className="add-to-collection-button" onClick={this.handleAddImage}>Add to collection</button>
			)
		}
	}

	render() {
		return(this.renderButton());
	}
}

const mapStateToProps = (state, ownProps) => {
	switch (ownProps.page) {
		case "collection-details":
			return {
				collectionId: state.collectionImageResults.collectionId
			};
		default:
			return {};
	}
}

export default connect(
	mapStateToProps,
	{ removeImageFromCollection }
)(AddRemoveImageButton);