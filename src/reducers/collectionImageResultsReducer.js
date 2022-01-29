import { 
	FETCH_COLLECTION_IMAGES, 
	LIKE_IMAGE, 
	SIGN_OUT, 
	UNLIKE_IMAGE 
} from "../actions/types";

const INITIAL_STATE = {
	currentPage: 1,
	collectionId: null,
	images: []
}

const collectionImageResultsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_COLLECTION_IMAGES:
			return action.payload;
		case SIGN_OUT:
			return INITIAL_STATE;
		case LIKE_IMAGE:
		case UNLIKE_IMAGE:
			return {
				...state, 
				images: state.images.map(image => {
					return image.id === action.payload.id ? action.payload : image
				})
			}
		default:
			return state;	
	}
}

export default collectionImageResultsReducer;