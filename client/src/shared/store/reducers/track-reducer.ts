import { AnyAction, PayloadAction, createReducer } from '@reduxjs/toolkit';
import { ITrack, TrackActionTypes, TrackState } from '../../types';
import { isFulfilledAction, isPendingAction, isRejectedAction } from '.';

const initialState: TrackState = {
	tracks: [],
	isLoading: false,
	error: '',
};

function isTrackAction(action: AnyAction) {
	return action.type === `${TrackActionTypes.FETCH_TRACKS}/fulfilled`;
}
function loadingFalse(state, action) {
	switch (action.type) {
		case (TrackActionTypes.FETCH_TRACKS, TrackActionTypes.DELETE_TRACK):
			state.isLoading = false;
			break;
	}
}
function loadingTrue(state, action) {
	switch (action.type) {
		case (TrackActionTypes.FETCH_TRACKS, TrackActionTypes.DELETE_TRACK):
			state.isLoading = true;
			break;
	}
}

export const trackReducer = createReducer(initialState, builder => {
	builder
		.addMatcher(isTrackAction, (state, action: PayloadAction<ITrack[]>) => {
			state.tracks = [...state.tracks, ...action.payload];
		})
		.addMatcher(isPendingAction, loadingTrue)
		//для всех промисов, которые разрешились успехом
		.addMatcher(isFulfilledAction, loadingFalse)
		//для всех промисов, которые выдают ошибку
		.addMatcher(isRejectedAction, loadingFalse)
		.addDefaultCase(store => store);
});
