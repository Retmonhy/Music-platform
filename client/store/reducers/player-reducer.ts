import { createReducer } from '@reduxjs/toolkit';
import { PlayerState } from '../../types/player';
import {
	pauseTrack,
	playTrack,
	setActive,
	setDuration,
	setVolume,
	setCurrentTime,
} from '../ActionCreators/player';

const initialState: PlayerState = {
	active: null,
	pause: true,
	currentTime: 0,
	duration: 0,
	volume: 50,
};
export const playerReducer = createReducer(initialState, builder => {
	builder
		.addCase(playTrack, state => {
			state.pause = false;
		})
		.addCase(pauseTrack, state => {
			state.pause = true;
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
		});
});
