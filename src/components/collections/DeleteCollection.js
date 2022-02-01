import React from "react";
import { connect } from "react-redux";

import { deleteCollection } from '../../actions';

import Modal from "../common/Modal";

class DeleteCollection extends React.Component {
	handleDeleteClick = async () => {
		await this.props.deleteCollection(this.props.currentCollection.id);
		this.props.hideDeleteModal();
	}

	renderActions() {
		return (
			<React.Fragment>
				<button className="button-cancel" onClick={this.props.hideDeleteModal}>Cancel</button>
				<button className="button-destructive" onClick={this.handleDeleteClick}>Delete</button>
			</React.Fragment>
		);
	}

	renderContent() {
		return (
			<React.Fragment>
				<p>Are you sure you want to delete this collection?</p>
				<p className="modal-content-highlight">{this.props.currentCollection.title}</p>
			</React.Fragment>
			 
		)
	}

	render() {
		return (
			<div>
				<Modal 
					dismiss={this.props.hideDeleteModal}
					title="Delete Collection"
					content={this.renderContent()}
					actions={this.renderActions()}
					type="alert"
				/>
			</div>
		)
	}
};

export default connect(
	null,
	{ deleteCollection }
)(DeleteCollection);