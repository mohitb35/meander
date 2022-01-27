import { combineReducers } from 'redux';

import authReducer from './authReducer';
import imagesReducer from './imagesReducer';
import pageSizeReducer from './pageSizeReducer';
import searchTermReducer from './searchTermReducer';

export default combineReducers({
	images: imagesReducer,
	searchTerm: searchTermReducer,
	pageSize: pageSizeReducer,
	auth: authReducer
});