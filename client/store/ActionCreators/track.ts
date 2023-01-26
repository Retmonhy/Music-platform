import axios from 'axios';
import { Dispatch } from 'react';
import { TrackAction, TrackActionTypes, ITrack } from './../../types/track';
import { api, IDeleteTrackResponse, TrackEndpoints } from '../../shared/api';
export const fetchTracks = async () => {
	return async (dispatch: Dispatch<TrackAction>) => {
		try {
			const { data: response } = await api.get<ITrack[]>(TrackEndpoints.TRACKS);
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
export const deleteTrack = async (track: ITrack) => {
	return async (dispatch: Dispatch<TrackAction>) => {
		try {
			const { data } = await api.delete<IDeleteTrackResponse>(
				`/tracks/${track._id}`,
			);
			dispatch({
				type: TrackActionTypes.DELETE_TRACK,
				payload: track,
			});
		} catch (e) {
			console.log('deleteTrack error = ', e);
		}
	};
};
export const searchTracks = async (query: string) => {
	return async (dispatch: Dispatch<TrackAction>) => {
		try {
			const { data: response } = await api.get<ITrack[]>(
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
