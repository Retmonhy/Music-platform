import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { IPlaylist, IPlaylistsState, User } from '@shared/types';
import {
	deletePlaylists,
	fetchPlaylists,
	managePlaylistToDeleteFromUser,
	managePlaylistTracks,
} from '../ActionCreators/playlists';

const initialState: IPlaylistsState = {
	//общие плейлисты
	playlists: [],
	isPlaylistLoading: false,

	//плейлисты юзера
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
		.addCase(
			fetchPlaylists.fulfilled,
			(state, action: PayloadAction<IPlaylist[]>) => {
				state.userPlaylists = action.payload.map(i => ({
					...i,
					owner: new User(i.owner),
				}));
				state.isPlaylistLoading = false;
			},
		)
		.addCase(managePlaylistTracks.fulfilled, (state, action) => {
			state.userPlaylists = state.userPlaylists.map(pl => {
				if (pl.id === action.payload.playlist.id) {
					return action.payload.playlist;
				}
				return pl;
			});
		})
		.addCase(fetchPlaylists.rejected, state => {
			state.isPlaylistLoading = false;
		})
		.addCase(fetchPlaylists.pending, state => {
			state.isPlaylistLoading = true;
		});
});
