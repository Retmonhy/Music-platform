import { AnyAction, PayloadAction, createReducer } from '@reduxjs/toolkit';
import { ITrack, TrackActionTypes, TrackState } from '../../types';
import { isFulfilledAction, isPendingAction, isRejectedAction } from '.';
import { fetchTracks, searchTracks } from '../ActionCreators/track';

const initialState: TrackState = {
	tracks: [],
	isLoading: false,

	searchedTracks: [],
	isSearching: false,
	error: '',
};

function validateActionType(actionType: string) {
	const condition =
		actionType.startsWith(TrackActionTypes.FETCH_TRACKS) ||
		actionType.startsWith(TrackActionTypes.DELETE_TRACK);
	return condition ? true : false;
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
function searchingTrue(state, action) {
	if (action.type.startsWith(TrackActionTypes.SEARCH_TRACKS)) {
		state.isSearching = true;
	}
}
function searchingFalse(state, action) {
	if (action.type.startsWith(TrackActionTypes.SEARCH_TRACKS)) {
		state.isSearching = false;
	}
}
export const trackReducer = createReducer(initialState, builder => {
	builder
		.addCase(searchTracks.fulfilled, (state, action) => {
			state.searchedTracks = action.payload;
		})
		.addCase(
			fetchTracks.fulfilled,
			(state, action: PayloadAction<ITrack[]>) => {
				state.tracks = [...state.tracks, ...action.payload];
			},
		)
		.addMatcher(isPendingAction, loadingTrue)
		.addMatcher(isPendingAction, searchingTrue)
		//для всех промисов, которые разрешились успехом
		.addMatcher(isFulfilledAction, loadingFalse)
		.addMatcher(isFulfilledAction, searchingFalse)
		//для всех промисов, которые выдают ошибку
		.addMatcher(isRejectedAction, loadingFalse)
		.addMatcher(isRejectedAction, searchingFalse)
		.addDefaultCase(store => store);
});
