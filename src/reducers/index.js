import { combineReducers } from 'redux';

import authReducer from './authReducer';
import imagesReducer from './imagesReducer';
import likedImagesReducer from './likedImagesReducer';
import pageSizeReducer from './pageSizeReducer';
import searchTermReducer from './searchTermReducer';
import userReducer from './userReducer';

export default combineReducers({
	images: imagesReducer,
	likedImages: likedImagesReducer,
	searchTerm: searchTermReducer,
	pageSize: pageSizeReducer,
	auth: authReducer,
	user: userReducer
});