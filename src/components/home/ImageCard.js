import React from "react";

import './ImageCard.css';

class ImageCard extends React.Component {
	constructor() {
		super();
		this.imageRef = React.createRef();
		this.state = {
			spans: 0
		}
	}
	
	setSpans = () => {
		// Get height
		const height = this.imageRef.current.parentElement.clientHeight;
		// Calculate no of spans
		const spans = Math.ceil( height / this.props.rowGap );
		this.setState({ spans })
	}

	componentDidMount() {
		this.imageRef.current.addEventListener('load', this.setSpans); 
		//In order to wait for image to load before setting spans in state
	}

	render() {
		console.log("rendering Image card");
		let {urls, alt_description} = this.props.image;
		return (
			<article className="result-card" style={{ gridRowEnd: `span ${this.state.spans + 1}` }}>
				<div className="container" >
					<img alt={alt_description} className="result-image" src={urls.small} ref={this.imageRef}/>
					<h2 className="result-title">{alt_description}</h2>
				</div>
			</article>
		)
	};
}

export default ImageCard;

