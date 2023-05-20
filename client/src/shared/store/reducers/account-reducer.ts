import { StorageKeys } from './../../types/localStorage';
import {
	fetchUserMusic,
	removeTrackFromMyMusic,
	addTrackIntoMyMusic,
	changeRouteTo,
	logout,
	update,
	searchUserTracks,
} from './../ActionCreators/account';

import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { IMenuItem, AccountRoutes, IAuthorizationAction, AccountActionTypes, AccountState, ITrack, User } from '../../types';
import { isFulfilledAction, isPendingAction, isRejectedAction } from '.';
import { ILoginUserResponse } from '@shared/api';
import { Local } from '@shared/const/Localization';

const menuList: IMenuItem[] = [
	{
		name: Local.Account.PersonalData,
		isSelected: false,
		href: AccountRoutes.Profile,
	},
	{
		name: Local.Account.MyMusic,
		isSelected: false,
		href: AccountRoutes.Tracks,
	},
	{
		name: Local.Account.MyPlaylists,
		isSelected: false,
		href: AccountRoutes.Playlists,
	},
	{
		name: Local.Account.Musition,
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
	search_userTracks: [],
	isSearching: false,

	isHidrated: true,
};
export const accountReducer = createReducer(initialState as AccountState, builder => {
	builder
		.addCase(changeRouteTo, (state, action) => ({
			...state,
			routes: menuList.map(i => (i.href === action.payload ? { ...i, isSelected: true } : i)),
		}))
		.addCase(logout.fulfilled, () => {
			if (localStorage) {
				localStorage.removeItem(StorageKeys.accessToken);
			}
			return initialState;
		})
		.addCase(update.fulfilled, (state, action) => ({
			...state,
			user: new User(action.payload),
		}))
		.addCase(searchUserTracks.fulfilled, (state, action) => ({
			...state,
			search_userTracks: action.payload,
			isSearching: false,
		}))
		.addCase(searchUserTracks.rejected, (state, action) => {
			state.isSearching = false;
		})
		.addCase(searchUserTracks.pending, (state, action) => {
			state.isSearching = true;
		})
		.addCase(fetchUserMusic.fulfilled, (state, action: PayloadAction<ITrack[]>) => {
			state.userTracks = action.payload;
		})
		.addCase(addTrackIntoMyMusic.fulfilled, (state, action) => {
			if (state.isAuth && action.payload) {
				state.userTracks = [action.payload, ...state.userTracks];
				state.user.tracks = [...state.user.tracks, action.payload._id];
			}
			return state;
		})
		.addCase(removeTrackFromMyMusic.fulfilled, (state, action) => {
			state.userTracks = state.userTracks.filter(track => track._id !== action.payload);
			state.user.tracks = state.user.tracks.filter(id => id !== action.payload);
		})
		.addMatcher(isAuthorizationAction, (state, action: PayloadAction<ILoginUserResponse>) => {
			if (!action.payload.isSuccess) {
				return state;
			}
			state.isAuth = true;
			state.user = new User(action.payload.user);
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
		})
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
});
