import {
	fetchUserMusic,
	fetchUserPlaylists,
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
	IPlaylist,
	IRefreshAction,
	ManageAction,
} from '../../types';
import { isFulfilledAction, isPendingAction, isRejectedAction } from '.';
import { managePlaylistTracks } from '../ActionCreators/playlist';

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
	accessToken: null,
	refreshToken: null,
	user: null,
	isLoading: false,
	isPlaylistLoading: false,
	isAuth: false,
	routes: menuList,
	userTracks: [],
	userPlaylists: [],
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
			.addCase(logout.fulfilled, () => initialState)
			.addCase(update.fulfilled, (state, action) => ({
				...state,
				user: action.payload,
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
			.addCase(managePlaylistTracks.fulfilled, (state, action) => {
				state.userPlaylists = state.userPlaylists.map(pl => {
					if (pl.id === action.payload.playlist.id) {
						return action.payload.playlist;
					}
					return pl;
				});
			})
			.addCase(removeTrackFromMyMusic.fulfilled, (state, action) => {
				state.userTracks = state.userTracks.filter(
					track => track._id !== action.payload,
				);
				state.user.tracks = state.user.tracks.filter(
					id => id !== action.payload,
				);
			})
			.addCase(
				fetchUserPlaylists.fulfilled,
				(state, action: PayloadAction<IPlaylist[]>) => {
					state.userPlaylists = action.payload;
					state.isPlaylistLoading = false;
				},
			)
			.addCase(fetchUserPlaylists.rejected, state => {
				state.isPlaylistLoading = false;
			})
			.addCase(fetchUserPlaylists.pending, state => {
				state.isPlaylistLoading = true;
			})
			.addMatcher(isAuthorizationAction, (state, action: IRefreshAction) => {
				state.isAuth = true;
				state.user = action.payload.user;
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
	},
);
