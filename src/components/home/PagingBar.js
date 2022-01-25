import React from 'react';
import { connect } from "react-redux";

import { updatePageSize, fetchImages } from "../../actions";

import './PagingBar.css';

class PagingBar extends React.Component {
	async handleSizeChange(size) {
		await this.props.updatePageSize(size);
		this.props.fetchImages(this.props.searchTerm);
	}

	render() {
		return (
			<div className="paging-bar">
				<nav id="page-nav" className="page-nav">
					<button id="btn-previous-page" disabled>←</button>
					<button className="btn-paging selected" disabled>1</button>
					<button className="btn-paging">2</button>
					<button className="btn-paging">3</button>
					<button id="btn-next-page">→</button>
				</nav>
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
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		searchTerm: state.searchTerm,
		pageSize: state.pageSize
	}
}

export default connect(
	mapStateToProps,
	{ updatePageSize, fetchImages }
)(PagingBar);