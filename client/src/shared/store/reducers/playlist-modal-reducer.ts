import {
	setCover,
	toggleCheckbox,
	loadState,
	setMode,
} from '../ActionCreators/playlists';
import { PlaylistMode, PlaylistTrack, IPlaylist } from '../../types/playlist';
import { createReducer } from '@reduxjs/toolkit';
import { IPlaylistModalState } from '../../types';
import {
	addToCurrentPlaylist,
	resetModalState,
	setVisible,
} from '../ActionCreators/playlists';

const initialState: IPlaylistModalState = {
	trackPool: [],
	selectedTracks: [],
	isVisible: false,
	info: null,
	mode: PlaylistMode.Create,
};

export const playlistModalReducer = createReducer(initialState, builder => {
	builder
		.addCase(addToCurrentPlaylist, (state, action) => {
			state.selectedTracks = [
				new PlaylistTrack(action.payload),
				...state.selectedTracks,
			];
		})
		.addCase(resetModalState, state => {
			state = { ...initialState };
			return state;
		})
		.addCase(setVisible, (state, action) => {
			state.isVisible = action.payload;
		})
		.addCase(setCover, (state, action) => {
			if (!state.info) state.info = {} as IPlaylist;
			state.info.cover = action.payload;
		})
		.addCase(toggleCheckbox, (state, action) => {
			state.selectedTracks = state.selectedTracks.map(i => {
				if (i.track._id === action.payload) {
					return { ...i, isChecked: !i.isChecked };
				}
				return i;
			});
		})
		.addCase(loadState.fulfilled, (state, action) => {
			state.info = action.payload.info;
			state.selectedTracks = action.payload.tracks.map(
				tr => new PlaylistTrack(tr, true),
			);
		})
		.addCase(setMode, (state, action) => {
			state.mode = action.payload;
		});
});
