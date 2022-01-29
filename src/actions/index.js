import { 
	FETCH_SEARCH_RESULTS, 
	UPDATE_SEARCH_TERM, 
	UPDATE_PAGE_SIZE, 
	SIGN_IN, 
	SIGN_OUT,
	FAILED_SIGN_IN,
	FETCH_USER_INFO,
	FETCH_LIKED_IMAGES,
	LIKE_IMAGE,
	UNLIKE_IMAGE,
	FETCH_COLLECTIONS,
	FETCH_COLLECTION_IMAGES,
	DELETE_COLLECTION
} from "./types";

import unsplash from '../apis/unsplash';
import axios from 'axios';

export const fetchSearchResults = (currentPage = 1) => {
	return async function(dispatch, getState) {
		let images = [];
		let totalPages = 0;

		const authorizationHeader = 
			getState().auth.isSignedIn ? 
			`Bearer ${getState().auth.accessToken['access_token']}`: 
			`Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`;

		const searchTerm = getState().searchTerm;
		
		if (searchTerm.length > 0) {
			const response = await unsplash.get('/search/photos', {
				params: { 
					query: searchTerm,
					per_page: getState().pageSize,
					page: currentPage
				}, 
				headers: {
					Authorization: authorizationHeader
				}
			});
			images = response.data.results;
			totalPages = response.data.total_pages;
		}
		
		// Dispatching action
		dispatch ({
			type: FETCH_SEARCH_RESULTS,
			payload: {
				currentPage,
				totalPages,
				images
			}
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

export const fetchLikedImages = (currentPage = 1) => {
	return async function(dispatch, getState) {
		const username = getState().user.username;
		const response = await unsplash.get(`/users/${username}/likes`, {
			params: { 
				per_page: getState().pageSize,
				page: currentPage
			},
			headers: { 
				Authorization: `Bearer ${getState().auth.accessToken['access_token']}`
			}
		});
		const images = response.data;
		
		// Dispatching action
		dispatch ({
			type: FETCH_LIKED_IMAGES,
			payload: {
				currentPage,
				images
			}
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
		

		// Dispatching action
		dispatch ({
			type: LIKE_IMAGE,
			payload: {
				likedPhoto: response.date.photo,
				updatedUser: response.data.user
			}
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

		
		// Dispatching action
		dispatch ({
			type: UNLIKE_IMAGE,
			payload: {
				unlikedPhoto: response.data.photo,
				updatedUser: response.data.user
			}
		})
	}
}

export const fetchCollections = (currentPage = 1) => {
	return async function(dispatch, getState) {
		const username = getState().user.username;
		const response = await unsplash.get(`/users/${username}/collections`, {
			params: { 
				per_page: getState().pageSize,
				page: currentPage
			},
			headers: { 
				Authorization: `Bearer ${getState().auth.accessToken['access_token']}`
			}
		});
		const collections = response.data;
		
		// Dispatching action
		dispatch ({
			type: FETCH_COLLECTIONS,
			payload: {
				currentPage,
				collections
			}
		});
	}
}

export const fetchCollectionImages = (collectionId, currentPage = 1) => {
	return async function(dispatch, getState) {
		const response = await unsplash.get(`/collections/${collectionId}/photos`, {
			params: { 
				per_page: getState().pageSize,
				page: currentPage
			},
			headers: { 
				Authorization: `Bearer ${getState().auth.accessToken['access_token']}`
			}
		});
		const images = response.data;
		
		
		// Dispatching action
		dispatch ({
			type: FETCH_COLLECTION_IMAGES,
			payload: {
				currentPage,
				collectionId,
				images
			}
		});
	}
}

export const deleteCollection = (collectionId) => {
	return async function(dispatch, getState) {
		await unsplash.delete(`/collections/${collectionId}`, {
			headers: { 
				Authorization: `Bearer ${getState().auth.accessToken['access_token']}`
			}
		});
		
		// Dispatching action
		dispatch ({
			type: DELETE_COLLECTION,
			payload: collectionId
		});
	}
}