import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { IPlaylist, IPlaylistsState, User } from '@shared/types';
import {
	deletePlaylists,
	fetchAllPlaylists,
	fetchUserPlaylists,
	managePlaylistToDeleteFromUser,
	managePlaylistTracks,
} from '../ActionCreators/playlists';

const initialState: IPlaylistsState = {
	//общие плейлисты
	playlists: [],
	isAllPlaylistLoading: false,

	//плейлисты юзера
	isUserPlaylistLoading: false,
	userPlaylists: [],
	playlistsToDelete: [],
};

const clearPlaylistsToDelete = state => {
	state.playlistsToDelete = [];
};

export const playlistsReducer = createReducer(initialState, builder => {
	builder
		.addCase(managePlaylistToDeleteFromUser, (state, action) => {
			const isInList = state.playlistsToDelete.includes(action.payload);
			const id = action.payload;
			if (isInList) {
				state.playlistsToDelete = state.playlistsToDelete.filter(i => i !== id);
			} else {
				state.playlistsToDelete.push(id);
			}
		})
		.addCase(deletePlaylists.fulfilled, clearPlaylistsToDelete)
		.addCase(deletePlaylists.rejected, clearPlaylistsToDelete)
		.addCase(managePlaylistTracks.fulfilled, (state, action) => {
			state.userPlaylists = state.userPlaylists.map(pl => {
				if (pl.id === action.payload.playlist.id) {
					return action.payload.playlist;
				}
				return pl;
			});
		})
		.addCase(
			fetchUserPlaylists.fulfilled,
			(state, action: PayloadAction<IPlaylist[]>) => {
				state.userPlaylists = action.payload.map(i => ({
					...i,
					owner: new User(i.owner),
				}));
				state.isUserPlaylistLoading = false;
			},
		)
		.addCase(fetchAllPlaylists.fulfilled, (state, action) => {
			return {
				...state,
				playlists: [
					...action.payload.map(i => ({
						...i,
						owner: new User(i.owner),
					})),
				],
				isAllPlaylistLoading: false,
			};
			// state.playlists = action.payload.map(i => ({
			// 	...i,
			// 	owner: new User(i.owner),
			// }));
		})

		//тут повторяющаяяся логика, можно оюбъединить в один обработчик
		.addCase(fetchUserPlaylists.rejected, state => {
			state.isUserPlaylistLoading = false;
		})
		.addCase(fetchUserPlaylists.pending, state => {
			state.isUserPlaylistLoading = true;
		})
		.addCase(fetchAllPlaylists.rejected, state => {
			state.isAllPlaylistLoading = false;
		})
		.addCase(fetchAllPlaylists.pending, state => {
			state.isAllPlaylistLoading = true;
		});
});
