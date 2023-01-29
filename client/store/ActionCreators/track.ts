import { Dispatch } from 'react';
import { TrackAction, TrackActionTypes, ITrack } from '../../types/track';
import { TrackService } from '../../shared';
export const fetchTracks = () => {
	return async (dispatch: Dispatch<TrackAction>) => {
		try {
			const { data } = await TrackService.fetchTracks();
			dispatch({
				type: TrackActionTypes.FETCH_TRACKS,
				payload: data,
			});
		} catch (e) {
			console.log('fetchTracks error = ', e);

			dispatch({
				type: TrackActionTypes.FETCH_TRACKS_ERROR,
				payload: 'Произошла ошибка при загрузке треков',
			});
		}
	};
};
export const deleteTrack = (track: ITrack) => {
	return async (dispatch: Dispatch<TrackAction>) => {
		try {
			const { data } = await TrackService.deleteTrack(track._id);
			dispatch({
				type: TrackActionTypes.DELETE_TRACK,
				payload: track,
			});
		} catch (e) {
			console.log('deleteTrack error = ', e);
		}
	};
};
export const searchTracks = (query: string) => {
	return async (dispatch: Dispatch<TrackAction>) => {
		try {
			const { data: response } = await TrackService.searchTracks(query);
			dispatch({
				type: TrackActionTypes.FETCH_TRACKS,
				payload: response,
			});
		} catch (e) {
			console.log('searchTracks error = ', e);

			dispatch({
				type: TrackActionTypes.FETCH_TRACKS_ERROR,
				payload: 'Произошла ошибка при загрузке треков',
			});
		}
	};
};
