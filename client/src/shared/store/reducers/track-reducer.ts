import { AnyAction, PayloadAction, createReducer } from '@reduxjs/toolkit';
import { ITrack, TrackActionTypes, TrackState } from '../../types';
import { isFulfilledAction, isPendingAction, isRejectedAction } from '.';

const initialState: TrackState = {
	tracks: [],
	isLoading: false,
	error: '',
};

function validateActionType(actionType: string) {
	const condition =
		actionType.startsWith(TrackActionTypes.FETCH_TRACKS) ||
		actionType.startsWith(TrackActionTypes.DELETE_TRACK);
	return condition ? true : false;
}
function isTrackAction(action: AnyAction) {
	return action.type === `${TrackActionTypes.FETCH_TRACKS}/fulfilled`;
}
function loadingFalse(state, action) {
	if (validateActionType(action.type)) {
		state.isLoading = false;
	}
}
function loadingTrue(state, action) {
	if (validateActionType(action.type)) {
		state.isLoading = true;
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
