import { createAsyncThunk } from '@reduxjs/toolkit';
import { TrackActionTypes } from '../../types/track';
import { TrackService } from '../../shared';

export const fetchTracks = createAsyncThunk(
	TrackActionTypes.FETCH_TRACKS,
	async (_, ta) => {
		try {
			const { data } = await TrackService.fetchTracksReq();
			if (data) {
				return data;
			}
		} catch (error) {
			console.error('fetchTracks ERROR: ', error);
			ta.rejectWithValue(error.response.data);
		}
	},
);
export const searchTracks = createAsyncThunk(
	TrackActionTypes.FETCH_TRACKS,
	async (query: string, ta) => {
		try {
			const { data } = await TrackService.searchTracksReq(query);
			if (data) {
				return data;
			}
		} catch (error) {
			console.error('searchTracks ERROR: ', error);
			ta.rejectWithValue(error.response.data);
		}
	},
);
