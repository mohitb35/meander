import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import './App.css';

import Header from "./common/Header";
import Home from "./home/Home";
import CollectionList from "./collections/CollectionList";
import LikedList from "./liked/LikedList";
import Footer from "./common/Footer";

const App = () => {
	return (
		<div className="app">
			<BrowserRouter>
				<Header />
				<main>
					<Route path="/" exact component={Home}/>
					<Route path="/collections" exact component={CollectionList}/>
					<Route path="/liked" exact component={LikedList}/>
				</main>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App;