import { StorageKeys } from './../../types/localStorage';
import {
	fetchUserMusic,
	removeTrackFromMyMusic,
	addTrackIntoMyMusic,
	changeRouteTo,
	logout,
	update,
} from './../ActionCreators/account';

import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
	IMenuItem,
	AccountRoutes,
	IAuthorizationAction,
	AccountActionTypes,
	AccountState,
	ITrack,
	User,
} from '../../types';
import { isFulfilledAction, isPendingAction, isRejectedAction } from '.';
import { managePlaylistTracks } from '../ActionCreators/playlists';
import { ILoginUserResponse } from '@shared/api';

const menuList: IMenuItem[] = [
	{
		name: 'Личные данные',
		isSelected: false,
		href: AccountRoutes.Profile,
	},
	{
		name: 'Моя музыка',
		isSelected: false,
		href: AccountRoutes.Tracks,
	},
	{
		name: 'Мои плейлисты',
		isSelected: false,
		href: AccountRoutes.Playlists,
	},
	{
		name: 'Музыкантам',
		isSelected: false,
		href: AccountRoutes.Musition,
	},
];

function isAuthorizationAction(action: IAuthorizationAction) {
	return action.type === `${AccountActionTypes.AUTHORIZATION}/fulfilled`;
}

const initialState: AccountState = {
	isAuth: false,
	user: null,
	accessToken: null,
	refreshToken: null,
	isLoading: false,
	routes: menuList,

	userTracks: [],

	isHidrated: true,
};
export const accountReducer = createReducer(
	initialState as AccountState,
	builder => {
		builder
			.addCase(changeRouteTo, (state, action) => ({
				...state,
				routes: menuList.map(i =>
					i.href === action.payload ? { ...i, isSelected: true } : i,
				),
			}))
			.addCase(logout.fulfilled, () => {
				if (localStorage) {
					localStorage.removeItem(StorageKeys.accessToken);
					localStorage.removeItem(StorageKeys.refreshToken);
				}
				return initialState;
			})
			.addCase(update.fulfilled, (state, action) => ({
				...state,
				user: new User(action.payload),
			}))
			.addCase(
				fetchUserMusic.fulfilled,
				(state, action: PayloadAction<ITrack[]>) => {
					state.userTracks = action.payload;
				},
			)
			.addCase(addTrackIntoMyMusic.fulfilled, (state, action) => {
				if (state.isAuth && action.payload) {
					state.userTracks = [action.payload, ...state.userTracks];
					state.user.tracks = [...state.user.tracks, action.payload._id];
				}
				return state;
			})
			.addCase(removeTrackFromMyMusic.fulfilled, (state, action) => {
				state.userTracks = state.userTracks.filter(
					track => track._id !== action.payload,
				);
				state.user.tracks = state.user.tracks.filter(
					id => id !== action.payload,
				);
			})
			.addMatcher(
				isAuthorizationAction,
				(state, action: PayloadAction<ILoginUserResponse>) => {
					if (!action.payload.isSuccess) {
						return state;
					}
					state.isAuth = true;
					state.user = new User(action.payload.user);
					state.accessToken = action.payload.accessToken;
					state.refreshToken = action.payload.refreshToken;
				},
			)
			//для всех промисов, которые в ожидании
			.addMatcher(isPendingAction, state => {
				state.isLoading = true;
			})
			//для всех промисов, которые разрешились успехом
			.addMatcher(isFulfilledAction, state => {
				state.isLoading = false;
			})
			//для всех промисов, которые выдают ошибку
			.addMatcher(isRejectedAction, state => {
				state.isLoading = false;
			})
			.addDefaultCase(store => store);
	},
);
