import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { makeStore, wrapper } from '../store';
import axios from 'axios';

const WrappedApp: React.FC<AppProps> = ({ Component, pageProps }) => (
	<Provider store={makeStore(null)}>
		<Component {...pageProps} />
	</Provider>
);

export default wrapper.withRedux(WrappedApp);
