import { apiInstance } from './../../pages/_app';
import axios from 'axios';
import { Dispatch } from 'react';
import { TrackAction, TrackActionTypes, ITrack } from './../../types/track';
import { Endpoints } from '../../api';
export const fetchTracks = async () => {
	return async (dispatch: Dispatch<TrackAction>) => {
		try {
			const { data: response } = await axios.get<ITrack[]>(
				'http://localhost:5000/tracks',
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
export const seacrhTracks = async (query: string) => {
	return async (dispatch: Dispatch<TrackAction>) => {
		try {
			const { data: response } = await apiInstance.get<ITrack[]>(
				Endpoints.SEARCH + `?query=${query}`,
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
