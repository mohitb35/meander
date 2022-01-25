import React from "react";
import { connect } from "react-redux";

import ImageCard from "./ImageCard";

import './ImageList.css';

class ImageList extends React.Component {
	constructor () {
		super();
		this.resultsGridRef = React.createRef();
		this.state = {
			rowGap: 10
		}
	}

	componentDidMount(){
		const rowGap = parseInt(
			window.getComputedStyle(this.resultsGridRef.current).getPropertyValue('grid-row-gap')
			);
		this.setState({
			rowGap
		});
	}

	renderImageList(){
		return this.props.images.map(image => {
			return <ImageCard image={image} key={image.id} rowGap={this.state.rowGap}/>
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

const mapStateToProps = (state) => {
	return {
		images: state.images
	}
}

export default connect(
	mapStateToProps
)(ImageList);

