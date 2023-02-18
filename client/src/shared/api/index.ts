import { AccountActionTypes } from './../../types/account';
import { StorageKeys } from '../types';
import axios from 'axios';
import { AccountEndpoints } from './endpoint';
import { ILoginUserResponse } from './interface';
import store from '../../store';

export * from './endpoint';
export * from './interface';
export * from './services';

export const baseUrl = 'http://localhost:5000';

export const generateUrl = (url: string = '') => {
	return baseUrl + url;
};
export const api = axios.create({
	withCredentials: true,
	baseURL: baseUrl,
});
api.interceptors.request.use(config => {
	if (typeof window !== 'undefined') {
		config.headers.Authorization = `Bearer ${localStorage.getItem(
			StorageKeys.accessToken,
		)}`;
	}
	return config;
});
api.interceptors.response.use(
	response => response,
	error => {
		console.log('interceptors.response ERROR = ', error);
		const originalReq = error.config;
		if (error.response.status === 401) {
			axios
				.get<ILoginUserResponse>(AccountEndpoints.REFRESH, {
					withCredentials: true,
				})
				.then(({ data }) => {
					if (typeof window !== 'undefined') {
						error.config.headers.Authorization = `Bearer ${data.accessToken}`;
					}
					localStorage.setItem(StorageKeys.accessToken, data.accessToken);
					store.dispatch({ type: AccountActionTypes.REFRESH, payload: data });
					axios.request(error.config);
				});
		}
		return Promise.reject(error);
	},
);
