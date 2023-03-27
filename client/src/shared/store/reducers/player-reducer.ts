import { ITrack } from './../../types/track';
import { startNext, startPrev } from './../ActionCreators/player';
import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import {
	pauseTrack,
	playTrack,
	setActive,
	setDuration,
	setVolume,
	setCurrentTime,
	setCurrentPlaylist,
	addTrackInQueue,
} from '../ActionCreators/player';
import { PlayerState } from '../../types';
//1_
const initialState: PlayerState = {
	active: null,
	pause: true,
	currentTime: 0,
	duration: 0,
	volume: 50,
	isHidrated: true,
	queueStack: [],
	currentPlaylist: [],
};

const playNextTrack = (state: PlayerState) => {
	if (!state.active) return state;
	const currentTrackIndex = state.currentPlaylist
		.map(i => i._id)
		.indexOf(state.active._id);
	if (currentTrackIndex < 0) return state;
	const lastIndex = state.currentPlaylist.length - 1;
	if (currentTrackIndex + 1 > lastIndex) {
		state.active = state.currentPlaylist[0]; //первый трек
		return state;
	}
	if (currentTrackIndex + 1 <= state.currentPlaylist.length) {
		state.active = state.currentPlaylist[currentTrackIndex + 1];
	}
};
const playPrevTrack = (state: PlayerState) => {
	if (!state.active) return state;
	const currentTrackIndex = state.currentPlaylist
		.map(i => i._id)
		.indexOf(state.active._id);
	if (currentTrackIndex < 0) return state;
	if (currentTrackIndex - 1 < 0) {
		state.currentTime = 0;
	}
	if (currentTrackIndex - 1 >= 0) {
		state.active = state.currentPlaylist[currentTrackIndex - 1];
	}
};
const addInQueue = (state: PlayerState, action: PayloadAction<ITrack>) => {
	// const index = state.currentPlaylist.map(i => i._id).indexOf(state.active._id);
	// state.currentPlaylist.splice(index + 1, 0, action.payload); //берем элемент за текущим, и вставляем перед ним новый трек
	state.queueStack = [...state.queueStack, action.payload];
};

export const playerReducer = createReducer(initialState, builder => {
	builder
		.addCase(playTrack, state => {
			state.pause = false;
		})
		.addCase(pauseTrack, state => {
			state.pause = true;
		})
		.addCase(startPrev, playPrevTrack)
		.addCase(startNext, playNextTrack)
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
		.addCase(setCurrentPlaylist, (state, action) => {
			state.currentPlaylist = action.payload;
		})
		.addCase(addTrackInQueue, addInQueue)
		.addDefaultCase(store => store);
});
