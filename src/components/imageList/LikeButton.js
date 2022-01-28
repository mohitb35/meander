import React from "react";
import { connect } from "react-redux";

import { likeImage, unlikeImage } from "../../actions";

import './LikeButton.css';

class LikeButton extends React.Component {
	handleLikeImage = () => {
		this.props.likeImage(this.props.imageId);
	}

	handleUnlikeImage = () => {
		this.props.unlikeImage(this.props.imageId);
	}

	renderLikeButton() {
		if (!this.props.isLiked) {
			return (
				<button className="like-image-button" onClick={this.handleLikeImage}>Like</button>
			)
		} else {
			return (
				<button className="unlike-image-button" onClick={this.handleUnlikeImage}>Unlike</button>
			)
		}
	}

	render() {
		return(this.renderLikeButton());
	}
}

export default connect(
	null,
	{ likeImage, unlikeImage }
)(LikeButton);