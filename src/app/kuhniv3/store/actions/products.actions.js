import axios from 'axios';

export const GET_PRODUCTS = '[E-COMMERCE APP] GET PRODUCTS';
export const SET_PRODUCTS_SEARCH_TEXT = '[E-COMMERCE APP] SET PRODUCTS SEARCH TEXT';
export const SET_PRODUCT_NEW = '[E-COMMERCE APP] SET PRODUCT NEW';
export const SET_SEARCH_PRODUCT = '[E-COMMERCE APP] SET SEARCH PRODUCT';

export function getProducts() {
	const request = axios.get('/api/e-commerce-app/products');
	// const request = axios.get('http://192.168.1.104:6001/api/modules/module/staff/v1/operation/user/records');

	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_PRODUCTS,
				payload: response.data
			})
		);
}

export function setProductsSearchText(event) {
	return {
		type: SET_PRODUCTS_SEARCH_TEXT,
		searchText: event.target.value
	};
}
export function setProductNew(event) {
	return {
		type: SET_PRODUCT_NEW,
		isNew: event
	};
}
export function setSearchProduct(product) {
	return {
		type: SET_SEARCH_PRODUCT,
		seachProduct: product
	};
}
