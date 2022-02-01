import React from "react";
import { connect } from "react-redux";

import ImageCard from "./ImageCard";
import ShowImage from "./ShowImage";
import AddToCollection from "./AddToCollection";

import './ImageList.css';

class ImageList extends React.Component {
	constructor () {
		super();
		this.resultsGridRef = React.createRef();
		this.state = {
			rowGap: 0,
			rowHeight: 1,
			isImageModalActive: false,
			isAddToCollectionModalActive: false,
			currentImage: null
		}
	}

	showImageModal = (image) => {
		this.setState({ isImageModalActive: true, currentImage: image });
	  }

	hideImageModal = () => {
		this.setState({ isImageModalActive: false, currentImage: null });
	}

	showAddToCollectionModal = (image) => {
		this.setState({ isAddToCollectionModalActive: true, currentImage: image });
	  }

	hideAddToCollectionModal = () => {
		this.setState({ isAddToCollectionModalActive: false, currentImage: null });
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
				showAddToCollectionModal={this.showAddToCollectionModal} 
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
				{this.state.isImageModalActive && 
					<ShowImage  
						hideImageModal={this.hideImageModal}
						currentImage={this.state.currentImage}
					/>
				}
				{this.state.isAddToCollectionModalActive && 
					<AddToCollection
						hideAddToCollectionModal={this.hideAddToCollectionModal}
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

