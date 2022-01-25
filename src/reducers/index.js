import { combineReducers } from 'redux';

import imagesReducer from './imagesReducer';
import pageSizeReducer from './pageSizeReducer';
import searchTermReducer from './searchTermReducer';

export default combineReducers({
	images: imagesReducer,
	searchTerm: searchTermReducer,
	pageSize: pageSizeReducer
});