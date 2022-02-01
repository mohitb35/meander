import { SUCCESS_REDIRECT } from "../actions/types";

const INITIAL_STATE = null;

const redirectReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SUCCESS_REDIRECT:
			return action.payload;
		default:
			return INITIAL_STATE;	
	}
}

export default redirectReducer;