import { 
	FETCH_LIKED_IMAGES, 
	LIKE_IMAGE, 
	SIGN_OUT, 
	UNLIKE_IMAGE 
} from "../actions/types";

const INITIAL_STATE =  {
	currentPage: 1,
	images: []
}

const likeResultsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_LIKED_IMAGES:
			return action.payload;
		case SIGN_OUT:
			return INITIAL_STATE;
		case LIKE_IMAGE:
			return {
				...state,
				images: [ ...state.images, action.payload.photo ]
			};
		case UNLIKE_IMAGE:
			return {
				...state,
				images: state.images.filter(image => image.id !== action.payload.photo.id)
			};
		default:
			return state;	
	}
}

export default likeResultsReducer;