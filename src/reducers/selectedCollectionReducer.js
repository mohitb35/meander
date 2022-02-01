import { UPDATE_SELECTED_COLLECTION } from "../actions/types";

const selectedCollectionReducer = (state = "", action) => {
	switch (action.type) {
		case UPDATE_SELECTED_COLLECTION:
			return action.payload;
		default:
			return state;	
	}
}

export default selectedCollectionReducer;