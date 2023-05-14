// import { AccountActionTypes } from '../types/account';
// import { StorageKeys } from '../types';
import axios from 'axios';
import { baseURL } from '@shared/const';
// import { AccountEndpoints } from './endpoint';
// import { ILoginUserResponse } from './interface';
// import store from '../store';

export const generateUrl = (url: string = '') => {
	return baseURL + url;
};
export const api = axios.create({
	withCredentials: true,
	baseURL: baseURL,
});
// api.interceptors.request.use(config => {
// 	if (typeof window !== 'undefined') {
// 		config.headers.Authorization = `Bearer ${localStorage.getItem(StorageKeys.accessToken)}`;
// 	}
// 	return config;
// });
// api.interceptors.response.use(
// 	response => response,
// 	error => {
// 		console.log('interceptors.response ERROR = ', error);
// 		const originalReq = error.config;
// 		if (error.response.status === 401) {
// 			axios
// 				.get<ILoginUserResponse>(generateUrl(AccountEndpoints.REFRESH), {
// 					withCredentials: true,
// 				})
// 				.then(({ data }) => {
// 					if (typeof window !== 'undefined') {
// 						console.log('data - config = ', data.accessToken === error.config.headers.Authorization);
// 						originalReq.headers.Authorization = `Bearer ${data.accessToken}`;
// 					}
// 					localStorage.setItem(StorageKeys.accessToken, data.accessToken);
// 					store.dispatch({ type: AccountActionTypes.REFRESH, payload: data });
// 					axios.request(originalReq);
// 				});
// 		}
// 		return Promise.reject(error);
// 	},
// );
