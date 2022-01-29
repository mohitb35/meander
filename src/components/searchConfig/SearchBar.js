import React from "react";
import { connect } from "react-redux";

import { updateSearchTerm, fetchSearchResults } from "../../actions";

import './SearchBar.css';

class SearchBar extends React.Component {
	handleFormSubmit = (event) => {
		event.preventDefault();
		this.props.fetchSearchResults();
	}

	render() {
		return (
			<div className="search-bar">
				<form onSubmit={this.handleFormSubmit}>
					<div>
						<input 
							type="text" 
							placeholder="What are you searching for?"
							name="term"
							value={this.props.searchTerm}
							onChange={(event) => this.props.updateSearchTerm(event.target.value)}
						/>
					</div>
				</form>
			</div>		
		)
	}
}

const mapStateToProps = (state) => {
	return {
		searchTerm: state.searchTerm
	}
}


export default connect(
	mapStateToProps,
	{ updateSearchTerm, fetchSearchResults }
)(SearchBar);