import React from "react";

import './Home.css';

import ImageList from "../imageList/ImageList";
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
				<ImageList page="search"/>
			</div>
		);
	}
}

export default Home;