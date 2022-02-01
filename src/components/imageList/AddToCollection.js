import React from "react";
import { connect } from "react-redux";

import { fetchCollections, addImageToCollection, updateSelectedCollection } from '../../actions';

import Modal from "../common/Modal";

import './AddToCollection.css';

class AddToCollection extends React.Component {
	componentDidMount() {
		if (this.props.collections.length === 0){
			this.props.fetchCollections();
		}	
	}

	handleSaveClick = async () => {
		await this.props.addImageToCollection(this.props.selectedCollection, this.props.currentImage.id);
		this.props.hideAddToCollectionModal();
	}

	renderActions() {
		if (this.props.collections.length) {
			return (
				<React.Fragment>
					<button className="button-cancel" onClick={this.props.hideAddToCollectionModal}>Cancel</button>
					<button 
						className="button-positive" 
						onClick={this.handleSaveClick}
						disabled={!this.props.selectedCollection}
					>Save</button>
				</React.Fragment>
			);
		}
	}

	generateCollectionOptions() {
		let collectionOptions = [];
		for (let collection of this.props.collections){
			collectionOptions.push(
				<option value={collection.id} key={collection.id}>{collection.title}</option>
			)
		};
		return collectionOptions;
	}

	renderContent() {
		if (this.props.collections.length) {
			return (
				<React.Fragment>
					<p>To which collection do you want to add this image?</p>
					<select 
						name="collection" 
						id="collection-selector" 
						value={this.props.selectedCollection} 
						onChange={(event) => this.props.updateSelectedCollection(event.target.value)}
					>
						<option disabled value="">Select a collection</option>
						{this.generateCollectionOptions()}
					</select>
				</React.Fragment> 
			)
		}
		return (
			<p>Please create a collection before adding images.</p>
		)
	}

	render() {
		return (
			<div>
				<Modal
					dismiss={this.props.hideAddToCollectionModal}
					title="Add Image To Collection" 
					content={this.renderContent()}
					type="alert"
					actions={this.renderActions()}
				/>
			</div>
		)
	}
};

const mapStateToProps = (state) => {
	return {
		collections: Object.values(state.collectionResults.collections),
		selectedCollection: state.selectedCollection
	}
}

export default connect(
	mapStateToProps,
	{ fetchCollections, addImageToCollection, updateSelectedCollection }
)(AddToCollection);