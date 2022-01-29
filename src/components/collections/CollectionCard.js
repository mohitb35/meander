import React from "react";

import './CollectionCard.css';

import { Link } from "react-router-dom";
/* import { connect } from "react-redux";

import './CollectionCard.css';
import LikeButton from "./LikeButton"; */

class CollectionCard extends React.Component {
	renderCollectionActions() {
			return (
				<React.Fragment>
					<div className="collection-actions">
						<button className="edit-collection-button">Edit</button>
						<button className="delete-collection-button">Delete</button>
					</div>
				</React.Fragment>
			)
	}

	render() {
		let {id, title, cover_photo } = this.props.collection;
		let alt_description, urls;
		if (cover_photo) {
			( {alt_description, urls} = cover_photo );
		}
		return (
			<article className="collection-card">				
				<Link to={`/collections/${id}`}> 
					<img alt={alt_description} className="collection-image" src={urls.small} />
					<h2 className="collection-title">{title}</h2>
				</Link>
				{ this.renderCollectionActions() }
			</article>
		)
	};
}

export default CollectionCard;
