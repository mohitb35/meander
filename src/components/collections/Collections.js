import React from "react";
import { connect } from "react-redux";

import { fetchCollections } from "../../actions";

import './Collections.css';

import CollectionList from './CollectionList';
import PagingBar from "../searchConfig/PagingBar";

class Collections extends React.Component {
	componentDidMount() {
		this.props.fetchCollections();
	}

	render() {
		return (
			<div className="collections">
				<div className="page-config">
					<h2>Your Collections</h2>
					<PagingBar page="collections"/>
				</div>
				<CollectionList collections={this.props.collections}/>
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