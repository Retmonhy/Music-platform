import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { StorageKeys, useAction } from '../shared';
import '../shared/styles/global.css';
import { NextThunkDispatch, wrapper } from '../shared/store';
import { MainLayout } from '../widgets';

export let audio: HTMLAudioElement | null = null;
export const setAudioInstance = (newAudio: HTMLAudioElement) => {
	audio = newAudio;
};
const WrappedApp: React.FC<AppProps> = ({ Component, ...pageProps }) => {
	const { store, props } = wrapper.useWrappedStore(pageProps);
	//так как WrappedApp вызывается при рендере кадой страницы, то наверное будет вызыватьсяэтот юзЭффект всегда
	const dispatch = store.dispatch as NextThunkDispatch;
	const { _account } = useAction();
	useEffect(() => {
		if (localStorage && localStorage.getItem(StorageKeys.accessToken)) {
			dispatch(_account.checkAuth());
		}
	}, []);
	return (
		<Provider store={store}>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</Provider>
	);
};

export default WrappedApp;
