import { RootState } from './reducers/index';
import { Context, createWrapper } from 'next-redux-wrapper';
import { AnyAction, Store } from 'redux';
import { reducer } from './reducers';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = (context: Context) =>
	configureStore<RootState>({ reducer, middleware: [thunk] });

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {});
export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
const store = makeStore(null);
export default store;