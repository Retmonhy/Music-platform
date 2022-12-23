import axios from 'axios';
import { Dispatch } from 'react';
import { TrackAction, TrackActionTypes, ITrack } from './../../types/track';
import { apiInstance, TrackEndpoints } from '../../shared/api';
export const fetchTracks = async () => {
	return async (dispatch: Dispatch<TrackAction>) => {
		try {
			const { data: response } = await apiInstance.get<ITrack[]>(
				TrackEndpoints.TRACKS,
			);
			dispatch({
				type: TrackActionTypes.FETCH_TRACKS,
				payload: response,
			});
		} catch (e) {
			console.log('error = ', e);

			dispatch({
				type: TrackActionTypes.FETCH_TRACKS_ERROR,
				payload: 'Произошла ошибка при загрузке треков',
			});
		}
	};
};
export const searchTracks = async (query: string) => {
	return async (dispatch: Dispatch<TrackAction>) => {
		try {
			const { data: response } = await apiInstance.get<ITrack[]>(
				TrackEndpoints.SEARCH + `?query=${query}`,
			);
			dispatch({
				type: TrackActionTypes.FETCH_TRACKS,
				payload: response,
			});
		} catch (e) {
			console.log('error = ', e);

			dispatch({
				type: TrackActionTypes.FETCH_TRACKS_ERROR,
				payload: 'Произошла ошибка при загрузке треков',
			});
		}
	};
};
