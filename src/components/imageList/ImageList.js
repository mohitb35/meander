import React from "react";
import { connect } from "react-redux";

import ImageCard from "./ImageCard";

import './ImageList.css';

class ImageList extends React.Component {
	constructor () {
		super();
		this.resultsGridRef = React.createRef();
		this.state = {
			rowGap: 0,
			rowHeight: 1
		}
	}

	componentDidMount(){
		const rowGap = parseInt(
			window.getComputedStyle(this.resultsGridRef.current).getPropertyValue('grid-row-gap')
			);
		const rowHeight = parseInt(
			window.getComputedStyle(this.resultsGridRef.current).getPropertyValue('grid-auto-rows')
			);
		this.setState({
			rowGap,
			rowHeight
		});
	}

	renderImageList(){
		return this.props.images.map(image => {
			return <ImageCard image={image} key={image.id} rowGap={this.state.rowGap} rowHeight={this.state.rowHeight}/>
		})
	}

	render() {
		return (
			<section id="results-grid" ref={this.resultsGridRef}>
				{this.renderImageList()}
			</section>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	switch (ownProps.page) {
		case "search":
			return {
				images: state.searchResults.images
			}
		case "likes": 
			return {
				images: state.likeResults.images
			}
		case "collection-details":
			return {
				images: state.collectionImageResults.images
			}
		default:
			return {
				images: []
			}
	}
	
}

export default connect(
	mapStateToProps
)(ImageList);

