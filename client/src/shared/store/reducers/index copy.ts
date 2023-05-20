import { RootState } from './reducers/index';
import { Context, createWrapper } from 'next-redux-wrapper';
import { AnyAction, Store } from 'redux';
import { reducer } from './reducers';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = (context: Context) => configureStore<RootState>({ reducer, middleware: [thunk] });

export const wrapper = createWrapper<Store<RootState>>(makeStore, {});
const store = makeStore(null); // надо решить проблему с сзданием нескольких инстансов стора при использовании разных dispatch
export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
export const useAppDispatch = () => store.dispatch as NextThunkDispatch;
export default store;
