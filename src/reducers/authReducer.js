import { SIGN_IN, SIGN_OUT, FAILED_SIGN_IN } from "../actions/types";

const INITIAL_STATE = {
	isSignedIn: null,
	accessToken: {},
	accessError: {}
}

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN:
			return { ...state, isSignedIn: true, accessToken: action.payload, accessError: {} };
		case SIGN_OUT:
			return { ...state, isSignedIn: false, accessToken: {}, accessError: {} };
		case FAILED_SIGN_IN: 
			return { 
				...state, 
				isSignedIn: false, 
				accessToken: {}, 
				accessError: action.payload 
			};
		default:
			return state;	
	}
}

export default authReducer;