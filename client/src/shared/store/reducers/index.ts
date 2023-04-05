import { trackReducer } from './track-reducer';
import { playerReducer } from './player-reducer';
import { accountReducer } from './account-reducer';
import { playlistReducer } from './playlist-reducer';
import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from 'redux';
import { AsyncThunk } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	player: playerReducer,
	track: trackReducer,
	account: accountReducer,
	playlist: playlistReducer,
});

export const reducer = (state: RootState, action) => {
	if (action.type === HYDRATE) {
		const nextState: RootState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		};
		//isHidrated показывает надо ли заполнять ту часть стора в которой он есть или нет.
		//решает проблему с мержем сторов с сервера и клиента.
		//есть вариант разеления сторов, но пока не понятно как использовать
		if (state.account.isHidrated) nextState.account = state.account;
		if (state.player.isHidrated) nextState.player = state.player;
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

export function isPendingAction(action: AnyAction): action is PendingAction {
	return action.type.endsWith('/pending');
}
export function isRejectedAction(action: AnyAction): action is RejectedAction {
	return action.type.endsWith('/rejected');
}
export function isFulfilledAction(
	action: AnyAction,
): action is FulfilledAction {
	return action.type.endsWith('/fulfilled');
}
