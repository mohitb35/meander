import React from "react";

import "./CollectionList.css";

import CollectionCard from "./CollectionCard";

class CollectionList extends React.Component {
	renderCollectionList(){
		return this.props.collections.map(collection => {
			return <CollectionCard collection={collection} key={collection.id} />
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