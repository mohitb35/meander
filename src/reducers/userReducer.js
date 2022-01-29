import { FETCH_USER_INFO, FAILED_SIGN_IN, SIGN_OUT, LIKE_IMAGE, UNLIKE_IMAGE } from "../actions/types";

const userReducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_USER_INFO:
			return action.payload;
		case LIKE_IMAGE:
		case UNLIKE_IMAGE:
			return action.payload.user;
		case FAILED_SIGN_IN:
		case SIGN_OUT:
			return {};
		default:
			return state;	
	}
}

export default userReducer;