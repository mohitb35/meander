import { FETCH_IMAGES, UPDATE_SEARCH_TERM, UPDATE_PAGE_SIZE } from "./types";

import unsplash from '../apis/unsplash';

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