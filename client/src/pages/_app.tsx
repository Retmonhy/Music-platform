import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { StorageKeys, useAction } from '@shared';
import store, { useAppDispatch, wrapper } from '@shared/store';
import '@shared/styles/global.css';
import { MainLayout } from '../widgets';
import { debouncedFetchPl } from './account/playlists';
import './../shared/styles/Global.scss';

export let audio: HTMLAudioElement | null = null;
export const setAudioInstance = (newAudio: HTMLAudioElement) => {
	audio = newAudio;
};
const WrappedApp: React.FC<AppProps> = ({ Component, ...pageProps }) => {
	// const { store, props } = wrapper.useWrappedStore(pageProps); //это строчка создавала дополнительный инстанс стора
	//так как WrappedApp вызывается при рендере кадой страницы, то наверное будет вызыватьсяэтот юзЭффект всегда
	const dispatch = useAppDispatch();
	const { _account } = useAction();
	useEffect(() => {
		if (localStorage && localStorage.getItem(StorageKeys.accessToken)) {
			dispatch(_account.checkAuth()).then(() => {
				debouncedFetchPl();
			});
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

export default wrapper.withRedux(WrappedApp);
