import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { wrapper } from '../store';
import defaultStore from '../store';
import { StorageKeys, useAction } from '../shared';
import '../shared/styles/global.css';
import { checkAuth } from '../store/ActionCreators/account';
import { AnyAction } from 'redux';

const WrappedApp: React.FC<AppProps> = ({ Component, ...pageProps }) => {
	const { store, props } = wrapper.useWrappedStore(pageProps);
	//так как WrappedApp вызывается при рендере кадой страницы, то наверное будет вызыватьсяэтот юзЭффект всегда
	useEffect(() => {
		console.log(
			'localStorage.getItem(accessToken) = ',
			localStorage.getItem(StorageKeys.accessToken),
		);
		if (localStorage.getItem(StorageKeys.accessToken)) {
			defaultStore.dispatch(checkAuth());
		}
	}, []);
	return (
		<Provider store={store}>
			<Component {...props.pageProps} />
		</Provider>
	);
};

export default WrappedApp;
