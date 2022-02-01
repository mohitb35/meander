import React from "react";

import './CollectionCard.css';

import { Link } from "react-router-dom";

class CollectionCard extends React.Component {
	renderCollectionActions() {
			return (
				<React.Fragment>
					<div className="collection-actions">
						<Link to={`/collections/edit/${this.props.collection.id}`} >
							<button className="edit-collection-button">Edit</button>
						</Link>
						<button 
							className="delete-collection-button" 
							onClick={
								() => this.props.collectionActions.showDeleteModal(this.props.collection)
							}
						>Delete</button>
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
					{cover_photo && 
						<img alt={alt_description} className="collection-image" src={urls.small} />
					}
					{!cover_photo && 
						<div className="no-image-block">No images added</div>
					}
					<h2 className="collection-title">{title}</h2>
				</Link>
				{ this.renderCollectionActions() }
			</article>
		)
	};
}

export default CollectionCard;

