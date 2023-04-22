import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPaginationParams, TrackService } from '@shared/api';
import { ITrack, TrackActionTypes } from '@shared/types';

export const fetchTracks = createAsyncThunk<
	ITrack[],
	IPaginationParams,
	{ rejectValue: ITrack[] }
>(TrackActionTypes.FETCH_TRACKS, async (params, ta) => {
	try {
		const { data } = await TrackService.fetchTracksReq(params);
		return data;
	} catch (error) {
		console.error('fetchTracks ERROR: ', error);
		//вот тут может быть и неправильно сделано, надо еще обработку ошибков в редьюдере сделать
		ta.rejectWithValue([]);
	}
});
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
