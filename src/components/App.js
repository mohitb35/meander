import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import './App.css';

import Header from "./common/Header";
import Home from "./home/Home";
import CollectionList from "./collections/CollectionList";
import Likes from "./liked/Likes";
import Footer from "./common/Footer";
import AuthLogic from "./auth/AuthLogic";
import PrivateRoute from "./auth/PrivateRoute";

const App = () => {
	return (
		<div className="app">
			<BrowserRouter>
				<Header />
				<main>
					<Route path="/" exact component={Home} />
					<PrivateRoute path="/collections" exact component={CollectionList} />
					<PrivateRoute path="/liked" exact component={Likes} />
					<Route path="/auth" exact component={AuthLogic} />
				</main>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App;