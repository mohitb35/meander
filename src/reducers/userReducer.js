import { FETCH_USER_INFO, FAILED_SIGN_IN, SIGN_OUT } from "../actions/types";

const userReducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_USER_INFO:
			return action.payload;
		case FAILED_SIGN_IN:
		case SIGN_OUT:
			return {}
		default:
			return state;	
	}
}

export default userReducer;