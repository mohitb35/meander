import { UPDATE_PAGE_SIZE } from '../actions/types';

const pageSizeReducer = (state = 10, action) => {
	switch (action.type) {
		case UPDATE_PAGE_SIZE:
			return action.payload;
		default:
			return state;	
	}
}

export default pageSizeReducer;