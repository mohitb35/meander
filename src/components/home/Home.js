import React from "react";

import './Home.css';

import ImageList from "../imageList/ImageList";
import SearchBar from "../searchConfig/SearchBar";
import PagingBar from "../searchConfig/PagingBar";

class Home extends React.Component {
	render() {
		return (
			<div className="home">
				<div className="search-config">
					<SearchBar />
					<PagingBar page="search"/>
				</div>
				<ImageList page="search"/>
			</div>
		);
	}
}

export default Home;