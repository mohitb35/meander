import React from 'react';
import { connect } from "react-redux";

import { 
	updatePageSize, 
	fetchSearchResults, 
	fetchLikedImages, 
	fetchCollections,
	fetchCollectionImages 
} from "../../actions";

import './PagingBar.css';

class PagingBar extends React.Component {
	async handleSizeChange(size) {
		await this.props.updatePageSize(size);
		switch (this.props.page) {
			case "search":
				return this.props.fetchSearchResults();
			case "likes":
				return this.props.fetchLikedImages();
			case "collections":
				return this.props.fetchCollections();
			case "collection-details":
				return this.props.fetchCollectionImages(this.props.collectionId);
			default:
				return;
		}
		
	}

	async handlePageChange(pageNum) {
		switch (this.props.page) {
			case "search": 
				return this.props.fetchSearchResults(pageNum);
			case "likes":
				return this.props.fetchLikedImages(pageNum);
			case "collections":
				return this.props.fetchCollections(pageNum);
			case "collection-details":
				return this.props.fetchCollectionImages(this.props.collectionId, pageNum);
			default:
				return;
		}
	}

	generatePageOptions() {
		const { totalPages } = this.props;
		let pageOptions = []
		for (let page = 1; page <= totalPages; page++){
			pageOptions.push(
				<option value={page} key={page}>Page {page} of {totalPages}</option>
			)
		};
		return pageOptions;
	}

	generatePreviousButton() {
		let { currentPage } = this.props;
		if (currentPage > 1){
			return (
				<button id="btn-previous-page" 
					onClick={() => this.handlePageChange(currentPage-1)}
				>←</button>
			)
		} else {
			return <button id="btn-previous-page" disabled>←</button> 
		}
	}

	generateNextButton() {
		let { currentPage, totalPages } = this.props;
		if (currentPage >= totalPages){
			return <button id="btn-next-page" disabled>→</button>
		} else {
			return (
				<button id="btn-next-page" 
					onClick={() => this.handlePageChange(currentPage+1)}
				>→</button>)
		}
	
	}

	renderPageNav() {
		let { currentPage, totalPages } = this.props;
		if (!totalPages) {
			return null;
		} else { 
			return (
				<nav id="page-nav" className="page-nav">
					{ this.generatePreviousButton() }
					<form>
						<select 
							name="page-selector" 
							id="page-selector" 
							value={currentPage} 
							onChange={(event) => this.handlePageChange(event.target.value)}
						>
							{ this.generatePageOptions() }
						</select>
					</form>
					{ this.generateNextButton() }
				</nav>
			)
		}
	}

	renderPageSizeSelector() {
		return (
			<form>
				<select 
					name="page-size" 
					id="page-size-selector" 
					/*className="hidden" */
					value={this.props.pageSize} 
					onChange={(event) => this.handleSizeChange(event.target.value)}
				>
					<option disabled>Items per page</option>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
				</select>
			</form>
		)
	}

	render() {
		return (
			<div className="paging-bar">
				{this.renderPageNav()}
				{this.renderPageSizeSelector()}
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	switch (ownProps.page) {
		case "search":
			return {
				pageSize: state.pageSize,
				results: state.searchResults.images,
				currentPage: state.searchResults.currentPage,
				totalPages: state.searchResults.totalPages
			}
		case "likes": 
			return {
				pageSize: state.pageSize,
				results: state.likeResults.images,
				currentPage: state.likeResults.currentPage,
				totalPages: Math.ceil(state.user.total_likes/state.pageSize)
			}
		case "collections":
			return {
				pageSize: state.pageSize,
				results: state.collectionResults.collections,
				currentPage: state.collectionResults.currentPage,
				totalPages: Math.ceil(state.user.total_collections/state.pageSize)
			}
		case "collection-details":
			let { collectionId } = ownProps;
			return {
				pageSize: state.pageSize,
				results: state.collectionImageResults.images,
				currentPage: state.collectionImageResults.currentPage,
				totalPages: Math.ceil(state.collectionResults.collections[collectionId].total_photos/state.pageSize)
			}
		default:
			return null;
	}
	
}

export default connect(
	mapStateToProps,
	{ 
		updatePageSize, 
		fetchSearchResults, 
		fetchLikedImages, 
		fetchCollections,
		fetchCollectionImages 
	}
)(PagingBar);