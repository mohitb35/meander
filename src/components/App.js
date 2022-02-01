import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';

import Header from "./common/Header";
import Home from "./home/Home";
import Collections from "./collections/Collections";
import CollectionDetails from "./collections/CollectionDetails";
import AddCollection from "./collections/AddCollection";
import EditCollection from "./collections/EditCollection";
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
					<Switch>
						<Route path="/" exact component={Home} />
						<PrivateRoute path="/collections" exact component={Collections} />
						<PrivateRoute path="/collections/add" component={AddCollection} />
						<PrivateRoute path="/collections/edit/:id" component={EditCollection} />
						<PrivateRoute path="/collections/:id" exact component={CollectionDetails} />
						<PrivateRoute path="/liked" exact component={Likes} />
						<Route path="/auth" exact component={AuthLogic} />
					</Switch>
				</main>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App;