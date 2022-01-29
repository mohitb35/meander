import React from "react";

import "./CollectionList.css";

import CollectionCard from "./CollectionCard";

class CollectionList extends React.Component {
	renderCollectionList(){
		let collectionActions = {
			showDeleteModal: this.props.showDeleteModal,
			hideDeleteModal: this.props.hideDeleteModal
		}
		return this.props.collections.map(collection => {
			return <CollectionCard collection={collection} key={collection.id} collectionActions={collectionActions}/>
		})
	}

	render() {
		return (
			<section id="collection-grid" >
				{this.renderCollectionList()}
			</section>
		)
	}
}

export default CollectionList;