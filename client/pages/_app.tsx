import React from 'react';
import { Provider } from 'react-redux';
import App, { AppProps } from 'next/app';
import store, { makeStore, wrapper } from '../store';
import '../shared/styles/global.css';

const WrappedApp: React.FC<AppProps> = ({ Component, ...pageProps }) => {
	const { store, props } = wrapper.useWrappedStore(pageProps);
	console.log('store = ', store.getState());

	return (
		<Provider store={store}>
			<Component {...props.pageProps} />
		</Provider>
	);
};

export default WrappedApp;
