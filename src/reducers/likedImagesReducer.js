import { FETCH_LIKED_IMAGES, LIKE_IMAGE, SIGN_OUT, UNLIKE_IMAGE } from "../actions/types";

const likedImagesReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_LIKED_IMAGES:
			return action.payload;
		case SIGN_OUT:
			return [];
		case LIKE_IMAGE:
			return [action.payload, ...state];
		case UNLIKE_IMAGE:
			return state.filter(image => image.id !== action.payload.id)
		default:
			return state;	
	}
}

export default likedImagesReducer;