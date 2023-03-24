import { fetchTracks } from './../ActionCreators/track';
import {
	setCover,
	toggleCheckbox,
	loadState,
	setMode,
} from './../ActionCreators/playlist';
import { PlaylistMode, PlaylistTrack } from './../../types/playlist';
import { createReducer } from '@reduxjs/toolkit';
import { IPlaylistState } from '../../types';
import {
	addTrackToPlaylist,
	resetModalState,
	setVisible,
} from '../ActionCreators/playlist';

const initialState: IPlaylistState = {
	trackPool: [],
	selectedTracks: [],
	isVisible: false,
	info: null,
	mode: PlaylistMode.Create,
};

export const playlistReducer = createReducer(initialState, builder => {
	builder
		.addCase(addTrackToPlaylist, (state, action) => {
			state.selectedTracks = [
				new PlaylistTrack(action.payload),
				...state.selectedTracks,
			];
		})
		.addCase(resetModalState, () => initialState)
		.addCase(setVisible, (state, action) => {
			state.isVisible = action.payload;
		})
		.addCase(setCover, (state, action) => {
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
