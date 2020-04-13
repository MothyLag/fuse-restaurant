import * as Actions from '../actions';

const initialState = {
	data: [],
	searchText: '',
	isNew: false
};

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_PRODUCTS: {
			return {
				...state,
				data: action.payload
			};
		}
		case Actions.SET_PRODUCTS_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
		case Actions.SET_PRODUCT_NEW: {
			return {
				...state,
				isNew: action.isNew
			};
		}
		case Actions.SET_SEARCH_PRODUCT: {
			return {
				...state,
				seachProduct: action.seachProduct
			};
		}
		default: {
			return state;
		}
	}
};

export default productsReducer;
