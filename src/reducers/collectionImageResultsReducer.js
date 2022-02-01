import { 
	ADD_IMAGE_TO_COLLECTION,
	FETCH_COLLECTIONS,
	FETCH_COLLECTION_IMAGES, 
	LIKE_IMAGE, 
	REMOVE_IMAGE_FROM_COLLECTION, 
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
		case FETCH_COLLECTIONS:
			return INITIAL_STATE;
		case REMOVE_IMAGE_FROM_COLLECTION:
			return {
				...state,
				images: state.images.filter(image => image.id !== action.payload.removedPhoto.id)
			}
		case ADD_IMAGE_TO_COLLECTION:
			if (action.payload.collectionId === state.collectionId) {
				return {
					...state,
					images: [...state.images, action.payload.addedPhoto ]
				}
			} else {
				return state;
			} 
		case LIKE_IMAGE:
		case UNLIKE_IMAGE:
			return {
				...state, 
				images: state.images.map(image => {
					return image.id === action.payload.photo.id ? action.payload.photo : image
				})
			}
		case SIGN_OUT:
			return INITIAL_STATE;
		default:
			return state;	
	}
}

export default collectionImageResultsReducer;