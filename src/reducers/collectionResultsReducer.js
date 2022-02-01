import { DELETE_COLLECTION, FETCH_COLLECTIONS, REMOVE_IMAGE_FROM_COLLECTION, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
	currentPage: 1,
	collections: {}
}

const collectionResultsReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case FETCH_COLLECTIONS:
			return { 
				currentPage: action.payload.currentPage,
				collections: {...action.payload.collections.reduce(
					(collectionMap, item) => {
						return {...collectionMap, [item.id]: item };
					},
					{}
				)} 
			};
		case DELETE_COLLECTION:
			const newCollections = { ...state.collections };
			delete newCollections[action.payload];
			return {
				...state,
				collections: newCollections
			}
		case REMOVE_IMAGE_FROM_COLLECTION:
		case ADD_IMAGE_TO_COLLECTION: 
			return {
				...state,
				collections: { ...state.collections, [action.payload.collection.id]: action.payload.collection }
			}
		case SIGN_OUT:
			return INITIAL_STATE;
		default:
			return state;
	}
}


export default collectionResultsReducer;