import React from "react";
import { connect } from "react-redux";

import './ImageCard.css';
import LikeButton from "./LikeButton";

class ImageCard extends React.Component {
	constructor() {
		super();
		this.imageRef = React.createRef();
		this.state = {
			spans: 0,
			previouslySignedIn: false
		}
	}
	
	setSpans = () => {
		// Get height
		const height = this.imageRef.current.parentElement.clientHeight;
		// Calculate no of spans
		const spans = Math.ceil( height / (this.props.rowGap + this.props.rowHeight) );
		this.setState({ spans })
	}

	componentDidMount() {
		this.imageRef.current.addEventListener('load', this.setSpans); 
		//In order to wait for image to load before setting spans in state
	}

	componentDidUpdate(prevProps) {
		if (this.props.isSignedIn !== prevProps.isSignedIn) {
			this.setSpans();
		}
	}

	renderImageActions() {
		let { id: imageId, liked_by_user: isLiked } = this.props.image;
		if (this.props.isSignedIn) {
			return (
				<React.Fragment>
					<div className="image-actions">
						<button className="add-to-collection-button">Add to collection</button>
						<LikeButton imageId={imageId} isLiked={isLiked} />
					</div>
					<div className="spacer"></div>
				</React.Fragment>
			)
		} 
	}

	render() {
		let {urls, alt_description} = this.props.image;
		return (
			<article 
				className="result-card" 
				style={{ gridRowEnd: `span ${this.state.spans + 1}`  }} 
				onClick={() => this.props.showImageModal(this.props.image)}
			>
				<div className="container" >
					<img alt={alt_description} className="result-image" src={urls.small} ref={this.imageRef}/>
					<h2 className="result-title">{alt_description}</h2>
					{ this.renderImageActions() }
				</div>
			</article>
		)
	};
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn
	}
}

export default connect(
	mapStateToProps
)(ImageCard);

