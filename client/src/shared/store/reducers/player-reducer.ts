import { startNext, startPrev } from './../ActionCreators/player';
import { createReducer } from '@reduxjs/toolkit';
import {
	pauseTrack,
	playTrack,
	setActive,
	setDuration,
	setVolume,
	setCurrentTime,
	setTrackOrder,
	addTrackInOrderTop,
} from '../ActionCreators/player';
import { PlayerState } from '../../types';

const initialState: PlayerState = {
	active: null,
	pause: true,
	currentTime: 0,
	duration: 0,
	volume: 50,
	isHidrated: true,
	trackOrder: [],
};
export const playerReducer = createReducer(initialState, builder => {
	builder
		.addCase(playTrack, state => {
			state.pause = false;
		})
		.addCase(pauseTrack, state => {
			state.pause = true;
		})
		.addCase(startPrev, (state, action) => {
			if (!state.active) return state;
			const currentTrackIndex = state.trackOrder
				.map(i => i._id)
				.indexOf(state.active._id);
			if (currentTrackIndex < 0) return state;
			if (currentTrackIndex - 1 < 0) {
				state.currentTime = 0;
			}
			if (currentTrackIndex - 1 >= 0) {
				state.active = state.trackOrder[currentTrackIndex - 1];
			}
		})
		.addCase(startNext, (state, action) => {
			if (!state.active) return state;
			const currentTrackIndex = state.trackOrder
				.map(i => i._id)
				.indexOf(state.active._id);
			if (currentTrackIndex < 0) return state;
			const lastIndex = state.trackOrder.length - 1;
			if (currentTrackIndex + 1 > lastIndex) {
				state.active = state.trackOrder[0]; //первый трек
				return state;
			}
			if (currentTrackIndex + 1 <= state.trackOrder.length) {
				state.active = state.trackOrder[currentTrackIndex + 1];
			}
		})
		.addCase(setActive, (state, action) => {
			state.active = action.payload;
		})
		.addCase(setVolume, (state, action) => {
			state.volume = action.payload;
		})
		.addCase(setDuration, (state, action) => {
			state.duration = action.payload;
		})
		.addCase(setCurrentTime, (state, action) => {
			state.currentTime = action.payload;
		})
		.addCase(setTrackOrder, (state, action) => {
			state.trackOrder = action.payload;
		})
		.addCase(addTrackInOrderTop, (state, action) => {
			state.trackOrder = [action.payload, ...state.trackOrder];
		})
		.addDefaultCase(store => store);
});
