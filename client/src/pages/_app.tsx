import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { NextThunkDispatch, wrapper } from '../store';
import { StorageKeys } from '../shared';
import '../shared/styles/global.css';
import { checkAuth } from '../store/ActionCreators/account';

const WrappedApp: React.FC<AppProps> = ({ Component, ...pageProps }) => {
	const { store, props } = wrapper.useWrappedStore(pageProps);
	//так как WrappedApp вызывается при рендере кадой страницы, то наверное будет вызыватьсяэтот юзЭффект всегда
	const dispatch = store.dispatch as NextThunkDispatch;
	useEffect(() => {
		if (localStorage.getItem(StorageKeys.accessToken)) {
			dispatch(checkAuth());
		}
	}, []);
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
};

export default WrappedApp;
