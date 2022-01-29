import React from "react";

import './ShowImage.css';

import Modal from "../common/Modal";

class ShowImage extends React.Component {
	renderContent() {
		let { alt_description, urls } = this.props.currentImage;
		return (
			<React.Fragment>
				<img 
					className="full-image" 
					src={urls.regular}
					alt={alt_description} 
				/>
				<p className="image-caption">{alt_description}</p>
			</React.Fragment>
			 
		)
	}

	render() {
		return (
			<div>
				<Modal 
					dismiss={this.props.hideImageModal}
					content={this.renderContent()}
				/>
			</div>
		)
	}
};

export default ShowImage;