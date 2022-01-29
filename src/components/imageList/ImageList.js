import React from "react";
import { connect } from "react-redux";

import ImageCard from "./ImageCard";
import ShowImage from "./ShowImage";

import './ImageList.css';

class ImageList extends React.Component {
	constructor () {
		super();
		this.resultsGridRef = React.createRef();
		this.state = {
			rowGap: 0,
			rowHeight: 1,
			isModalActive: false,
			currentImage: null
		}
	}

	showImageModal = (image) => {
		this.setState({ isModalActive: true, currentImage: image });
	  }

	hideImageModal = () => {
		this.setState({ isModalActive: false, currentImage: null });
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
			return <ImageCard 
				image={image} 
				key={image.id} 
				rowGap={this.state.rowGap} 
				rowHeight={this.state.rowHeight} 
				showImageModal={this.showImageModal} 
				hideImageModal={this.hideImageModal}
				page={this.props.page}
			/>
		})
	}

	render() {
		return (
			<React.Fragment>
				<section id="results-grid" ref={this.resultsGridRef}>
					{this.renderImageList()}
				</section>
				{this.state.isModalActive && 
					<ShowImage  
						hideImageModal={this.hideImageModal}
						currentImage={this.state.currentImage}
					/>
				}
			</React.Fragment>
			
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

