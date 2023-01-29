import axios from 'axios';
import { StorageKeys } from '../types';

export * from './endpoint';
export * from './interface';

export const baseUrl = 'http://localhost:5000/';

export const generateUrl = (url: string = '') => {
	return baseUrl + url;
};
export const api = axios.create({
	withCredentials: true,
	baseURL: baseUrl,
});
api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem(
		StorageKeys.accessToken,
	)}`;
	return config;
});
api.interceptors.response.use(
	response => response,
	error => {
		console.log('error11 = ', error);
		// if (error.response.status === 401) {
		// }
		return error;
	},
);
