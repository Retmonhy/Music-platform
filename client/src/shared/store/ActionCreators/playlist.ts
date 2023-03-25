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
	async (loadingState: IPlaylist) => {
		const { data } = await PlaylistService.fetchPlaylistTracks(loadingState.id);
		return { info: loadingState, tracks: data };
	},
);
interface IManagePlaylistTracksPayload {
	playlistId: string;
	trackId: string;
}
export const managePlaylistTracks = createAsyncThunk(
	PlaylistActionTypes.ADD_TO_PLAYLIST,
	async (input: IManagePlaylistTracksPayload, ta) => {
		try {
			const { playlistId, trackId } = input;
			const { data } = await PlaylistService.managePlaylistTracks(
				playlistId,
				trackId,
			);
			return { playlist: data };
		} catch (error) {}
	},
);
