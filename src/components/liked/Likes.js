import React from "react";
import { connect } from "react-redux";

import { fetchLikedImages } from "../../actions";

import './Likes.css';

import ImageList from "../imageList/ImageList";
import PagingBar from "../searchConfig/PagingBar";

class LikedList extends React.Component {
	componentDidMount() {
		this.props.fetchLikedImages();
	}

	render() {
		return (
			<div className="likes">
				<div className="page-config">
					<h2>Your Likes</h2>
					<PagingBar page="likes"/>
				</div>
				<ImageList page="likes"/>
			</div>
		)
	}
}

export default connect(
	null,
	{ fetchLikedImages }
)(LikedList);