import { 
	FETCH_IMAGES, 
	UPDATE_SEARCH_TERM, 
	UPDATE_PAGE_SIZE, 
	SIGN_IN, 
	SIGN_OUT,
	FAILED_SIGN_IN,
	FETCH_USER_INFO,
	FETCH_LIKED_IMAGES,
	LIKE_IMAGE,
	UNLIKE_IMAGE
} from "./types";

import unsplash from '../apis/unsplash';
import axios from 'axios';

export const fetchImages = (searchTerm = "") => {
	return async function(dispatch, getState) {
		let images = [];
		let authorizationHeader = 
			getState().auth.isSignedIn ? 
			`Bearer ${getState().auth.accessToken['access_token']}`: 
			`Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`

		if (searchTerm.length > 0) {
			const response = await unsplash.get('/search/photos', {
				params: { 
					query: searchTerm,
					per_page: getState().pageSize
				}, 
				headers: {
					Authorization: authorizationHeader
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
		const oauthTokenUrl = "https://meander-api.herokuapp.com/oauth/token";

		const data = {
			redirect_uri: 'http://localhost:3000/auth', 
			grant_type: "authorization_code",
			code
		}
		
		try {
			const response = await axios.post(oauthTokenUrl, data);
			// Dispatching action
			dispatch(signIn(response.data));
			dispatch(fetchUserInfo());
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

export const fetchUserInfo = () => {
	return async function(dispatch, getState) {
		const response = await unsplash.get('/me', {
			headers: { 
				Authorization: ` Bearer ${getState().auth.accessToken['access_token']} `
			}
		});

		const user = response.data;
		
		// Dispatching action
		dispatch ({
			type: FETCH_USER_INFO,
			payload: user
		});
	}
}

export const fetchLikedImages = () => {
	return async function(dispatch, getState) {
		const username = getState().user.username;
		const response = await unsplash.get(`/users/${username}/likes`, {
			params: { 
				per_page: 10,
			},
			headers: { 
				Authorization: `Bearer ${getState().auth.accessToken['access_token']}`
			}
		});
		const images = response.data;
		
		// Dispatching action
		dispatch ({
			type: FETCH_LIKED_IMAGES,
			payload: images
		});
	}
}

export const likeImage = (imageId) => {
	return async function(dispatch, getState) {
		const response = await unsplash.post(`/photos/${imageId}/like`, {}, {
			headers: { 
				Authorization: `Bearer ${getState().auth.accessToken['access_token']}`
			}
		});
		
		const likedPhoto = response.data.photo;

		// Dispatching action
		dispatch ({
			type: LIKE_IMAGE,
			payload: likedPhoto
		})
	}
}

export const unlikeImage = (imageId) => {
	return async function(dispatch, getState) {
		const response = await unsplash.delete(`/photos/${imageId}/like`, {
			headers: { 
				Authorization: `Bearer ${getState().auth.accessToken['access_token']}`
			}
		});

		const unlikedPhoto = response.data.photo;
		
		// Dispatching action
		dispatch ({
			type: UNLIKE_IMAGE,
			payload: unlikedPhoto
		})
	}
}