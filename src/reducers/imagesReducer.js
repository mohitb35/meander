import { FETCH_IMAGES, LIKE_IMAGE, UNLIKE_IMAGE } from "../actions/types";

const imagesReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_IMAGES:
			return action.payload;
		case LIKE_IMAGE:
		case UNLIKE_IMAGE:
			return state.map(image => {
				return image.id === action.payload.id ? action.payload : image
			})
		default:
			return state;	
	}
}

export default imagesReducer;