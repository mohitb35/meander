import React from "react";
import { connect } from "react-redux";

import { fetchCollectionImages } from '../../actions';

import './CollectionDetails.css';

import ImageList from "../imageList/ImageList";
import PagingBar from "../searchConfig/PagingBar";

class CollectionDetails extends React.Component {
	componentDidMount() {
		let { id : collectionId } = this.props.match.params;
		if (!this.props.collection){
			this.props.fetchCollection(collectionId);
		}
		this.props.fetchCollectionImages(collectionId);
	}

	render() {
		if (this.props.collection) {
			return (
				<div className="collection-detail">
					<div className="page-config">
						<div className="collection-info">
							<h2>{this.props.collection.title}</h2>
							<p>{this.props.collection.description}</p>
						</div>
						<PagingBar page="collection-details" collectionId={this.props.match.params.id}/>
					</div>
					<ImageList page="collection-details"/>
				</div>
		) } else {
			return <div>Loading...</div>
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		collection: state.collectionResults.collections[ownProps.match.params.id],
		collectionImages: state.collectionImages
	}
}

export default connect(
	mapStateToProps,
	{ fetchCollectionImages }
)(CollectionDetails);