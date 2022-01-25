import React from "react";

import './Home.css';

import ImageList from "./ImageList";
import SearchBar from "./SearchBar";
import PagingBar from "./PagingBar";

class Home extends React.Component {
	render() {
		return (
			<div className="home">
				<div className="search-config">
					<SearchBar />
					<PagingBar />
				</div>
				<ImageList />
			</div>
		);
	}
}

export default Home;