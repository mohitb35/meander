import { combineReducers } from 'redux';

import authReducer from './authReducer';
import collectionImageResultsReducer from './collectionImageResultsReducer';
import collectionResultsReducer from './collectionResultsReducer';
import searchResultsReducer from './searchResultsReducer';
import likeResultsReducer from './likeResultsReducer';
import pageSizeReducer from './pageSizeReducer';
import searchTermReducer from './searchTermReducer';
import userReducer from './userReducer';
import selectedCollectionReducer from './selectedCollectionReducer';
import redirectReducer from './redirectReducer';

export default combineReducers({
	searchResults: searchResultsReducer,
	likeResults: likeResultsReducer,
	searchTerm: searchTermReducer,
	pageSize: pageSizeReducer,
	auth: authReducer,
	user: userReducer,
	collectionResults: collectionResultsReducer,
	collectionImageResults: collectionImageResultsReducer,
	selectedCollection: selectedCollectionReducer,
	redirectTo: redirectReducer
});