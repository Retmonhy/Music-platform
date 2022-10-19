import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { wrapper } from '../store';
import axios from 'axios';

export const generateUrl = (url: string = '') => {
	return 'http://localhost:5000/' + url;
};
export const apiInstance = axios.create({
	baseURL: generateUrl(),
});

const WrappedApp: React.FC<AppProps> = ({ Component, pageProps }) => (
	<Component {...pageProps} />
);

export default wrapper.withRedux(WrappedApp);
