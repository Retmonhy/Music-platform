import {
	IManagePlaylistTracksPayload,
	PlaylistMode,
} from '../../types/playlist';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IPlaylist, ITrack, PlaylistActionTypes } from '../../types';
import { PlaylistService } from '../../api';

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
//управляет списком плейлистов (внешних, которые созданы другими пользователями), которые подлежат удалению после выхода со страницы плейлистов
export const managePlaylistToDeleteFromUser = createAction<string>(
	PlaylistActionTypes.MANAGE_PLAYLIST_TO_DELETE,
);
//загружает подробные данные о плейлисте, когда открывается модалка
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
//удаляет/добавляет трекив  плейтист
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
//запрашивает плейлисты: весь список и пользловательсякие (в зависимости от параметров)
export const fetchPlaylists = createAsyncThunk(
	PlaylistActionTypes.FETCH_PLAYLISTS,
	async (_, ta) => {
		try {
			const { data } = await PlaylistService.fetchPlaylists();
			if (data) {
				return data;
			}
		} catch (error) {
			console.error('fetchPlaylists ERROR: ', error);
			return ta.rejectWithValue(error.response.data);
		}
	},
);
