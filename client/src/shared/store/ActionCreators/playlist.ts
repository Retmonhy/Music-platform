import { PlaylistMode } from './../../types/playlist';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { searchTracks } from './track';
import {
	IPlaylist,
	IPlaylistPayload,
	ITrack,
	PlaylistActionTypes,
} from '../../types';
import { PlaylistService } from '../../api';

interface IUpdateProfilePayload {
	id: string;
	data: IPlaylistPayload;
}
export const addTrackToPlaylist = createAction<ITrack>(
	PlaylistActionTypes.ADD_TRACK,
);
export const resetModalState = createAction(
	PlaylistActionTypes.RESET_MODAL_STATE,
);
export const setVisible = createAction<boolean>(PlaylistActionTypes.VISIBLE);
export const setCover = createAction<string | null>(PlaylistActionTypes.COVER);
export const toggleCheckbox = createAction<string>(
	PlaylistActionTypes.TOGGLE_CHECKBOX,
);
export const loadState = createAsyncThunk(
	PlaylistActionTypes.LOAD_PLAYLIST_STATE,
	async (loadingState: IPlaylist) => {
		const { data } = await PlaylistService.fetchPlaylistTracks(loadingState.id);
		return { info: loadingState, tracks: data };
	},
);
export const setMode = createAction<PlaylistMode>(PlaylistActionTypes.SET_MODE);
