import { 
	FETCH_IMAGES, 
	UPDATE_SEARCH_TERM, 
	UPDATE_PAGE_SIZE, 
	SIGN_IN, 
	SIGN_OUT,
	FAILED_SIGN_IN 
} from "./types";

import unsplash from '../apis/unsplash';
import axios from 'axios';

export const fetchImages = (searchTerm = "") => {
	return async function(dispatch, getState) {
		let images = [];

		if (searchTerm.length > 0) {
			const response = await unsplash.get('/search/photos', {
				params: { 
					query: searchTerm,
					per_page: getState().pageSize
				}
			});
			images = response.data.results;
		}
		
		// Dispatching action
		dispatch ({
			type: FETCH_IMAGES,
			payload: images
		});
	}
};

export const updateSearchTerm = (searchTerm) => {
	// Returning action
	return {
		type: UPDATE_SEARCH_TERM,
		payload: searchTerm
	};
};

export const updatePageSize = (pageSize) => {
	// Returning action
	return {
		type: UPDATE_PAGE_SIZE,
		payload: Number(pageSize)
	};
};

export const fetchAccessToken = (code) => {
	return async function(dispatch) {
		const oauthTokenUrl = "http://localhost:3001/oauth/token";

		const data = {
			redirect_uri: 'http://localhost:3000/auth', 
			grant_type: "authorization_code",
			code
		}
		
		try {
			const response = await axios.post(oauthTokenUrl, data);
			console.log(response.data);
		
			// Dispatching action
			dispatch(signIn(response.data));
		} catch (err) {
			dispatch(failedSignIn(err.response.data));
		}
		
	}
};

export const failedSignIn = (err) => {
	return ({
		type: FAILED_SIGN_IN,
		payload: err
	})
}

export const signIn = (accessToken) => {
	return ({
		type: SIGN_IN,
		payload: accessToken
	})
}

export const signOut = () => {
	return ({
		type: SIGN_OUT
	})
}