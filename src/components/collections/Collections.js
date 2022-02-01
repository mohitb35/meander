import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchCollections } from "../../actions";

import './Collections.css';

import CollectionList from './CollectionList';
import PagingBar from "../searchConfig/PagingBar";
import DeleteCollection from "./DeleteCollection";

class Collections extends React.Component {
	state = { 
		isModalActive: false,
		currentCollection: null
	}

	showDeleteModal = (collection) => {
		this.setState({ isModalActive: true, currentCollection: collection });
	  }

	hideDeleteModal = () => {
		this.setState({ isModalActive: false, currentCollection: null });
	}

	componentDidMount() {
		this.props.fetchCollections();
	}

	render() {
		return (
			<div className="collections">
				<Link to="/collections/add" >
					<button className="create-collection-button">
						Create New Collection
					</button>
				</Link>
				<div className="page-config">
					<h2>Your Collections</h2>
					<PagingBar page="collections"/>
				</div>
				<CollectionList collections={this.props.collections} showDeleteModal={this.showDeleteModal} hideDeleteModal={this.hideDeleteModal}/>
				{this.state.isModalActive && 
					<DeleteCollection  
						hideDeleteModal={this.hideDeleteModal}
						currentCollection={this.state.currentCollection}
					/>
       			 }
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		collections: Object.values(state.collectionResults.collections)
	}
};

export default connect(
	mapStateToProps,
	{ fetchCollections }
)(Collections);