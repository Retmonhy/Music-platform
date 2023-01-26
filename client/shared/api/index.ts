import axios from 'axios';

export * from './endpoint';
export * from './interface';

const baseUrl = 'http://localhost:5000/';

export const generateUrl = (url: string = '') => {
	return baseUrl + url;
};
export const api = axios.create({
	withCredentials: true,
	baseURL: baseUrl,
});

api.interceptors.request.use(config => {
	return config;
	// config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
});
