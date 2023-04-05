import {
	IManagePlaylistTracksPayload,
	ManageAction,
	PlaylistMode,
} from './../../types/playlist';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
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
export const addToCurrentPlaylist = createAction<ITrack>(
	PlaylistActionTypes.ADD_TO_CURRENT_PLAYLIST,
);
export const resetModalState = createAction(
	PlaylistActionTypes.RESET_MODAL_STATE,
);
export const setVisible = createAction<boolean>(PlaylistActionTypes.VISIBLE);
export const setCover = createAction<string | null>(PlaylistActionTypes.COVER);
export const setMode = createAction<PlaylistMode>(PlaylistActionTypes.SET_MODE);
export const toggleCheckbox = createAction<string>(
	PlaylistActionTypes.TOGGLE_CHECKBOX,
);
export const loadState = createAsyncThunk(
	PlaylistActionTypes.LOAD_PLAYLIST_STATE,
	async (loadingState: IPlaylist, ta) => {
		try {
			const { data } = await PlaylistService.fetchPlaylistTracks(
				loadingState.id,
			);
			return { info: loadingState, tracks: data };
		} catch (error) {
			console.error('loadPlaylistState ERROR: ', error);
			return ta.rejectWithValue(error.response.data);
		}
	},
);
export const managePlaylistTracks = createAsyncThunk(
	PlaylistActionTypes.ADD_TO_PLAYLIST,
	async (params: IManagePlaylistTracksPayload, ta) => {
		try {
			const { action } = params;
			const { data } = await PlaylistService.managePlaylistTracks(params);
			return { playlist: data, action };
		} catch (error) {
			console.error('managePlaylistTracks ERROR: ', error);
			return ta.rejectWithValue(error.response.data);
		}
	},
);
