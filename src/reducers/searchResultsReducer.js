import { FETCH_SEARCH_RESULTS, LIKE_IMAGE, UNLIKE_IMAGE } from "../actions/types";

const INITIAL_STATE = {
	currentPage: 1,
	totalPages: null,
	images: []
}

const searchResultsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_SEARCH_RESULTS:
			return action.payload;
		case LIKE_IMAGE:
		case UNLIKE_IMAGE:
			return { 
				...state, 
				images: state.images.map(image => {
					return image.id === action.payload.photo.id ? action.payload.photo : image
				}) 
			}
		default:
			return state;	
	}
}

export default searchResultsReducer;