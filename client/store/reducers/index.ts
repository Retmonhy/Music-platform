import { trackReducer } from './track-reducer';
import { playerReducer } from './player-reducer';
import { accountReducer } from './account-reducer';
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import { AsyncThunk } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	player: playerReducer,
	track: trackReducer,
	account: accountReducer,
});

export const reducer = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		};
		if (state.count) nextState.count = state.count; // preserve count value on client side navigation
		return nextState;
	} else {
		return rootReducer(state, action);
	}
};
export type RootState = ReturnType<typeof rootReducer>;
export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;
