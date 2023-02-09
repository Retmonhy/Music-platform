import { TrackState, TrackActionTypes } from './../../types/track';
import { AnyAction, createReducer } from '@reduxjs/toolkit';

const initialState: TrackState = {
	tracks: [],
	error: '',
};

function isTrackAction(action: AnyAction) {
	return action.type === `${TrackActionTypes.FETCH_TRACKS}/fulfilled`;
}

export const trackReducer = createReducer(initialState, builder => {
	builder
		.addMatcher(isTrackAction, (state, action) => {
			state.tracks = action.payload;
		})
		.addDefaultCase(store => store);
});
