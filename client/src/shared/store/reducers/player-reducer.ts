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
	listenedTracks: [],
};

const playNextTrack = (state: PlayerState) => {
	if (!state.active) return state;
	state.listenedTracks = [...state.listenedTracks, state.active];
	if (state.queueStack.length > 0) {
		//если в очереди еще что-то есть
		state.active = state.queueStack[0];
		state.queueStack.shift();
	} else {
		//если очередь кончилась(послений трек), надо начать проигрывание заново иил не надо. Тут по разному у платформ
		state.active = state.listenedTracks[0];
		state.queueStack = state.listenedTracks.slice(1);
		state.listenedTracks = [];
	}
};
const playPrevTrack = (state: PlayerState) => {
	if (!state.active) return state;
	if (state.listenedTracks.length > 0) {
		state.queueStack = [state.active, ...state.queueStack];
		state.active = state.listenedTracks.at(-1);
		state.listenedTracks.pop();
	}
	if (state.listenedTracks.length === 0) {
		state.currentTime = 0;
	}
};
const addInQueue = (state: PlayerState, action: PayloadAction<ITrack>) => {
	state.queueStack = [action.payload, ...state.queueStack];
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
			const { tracks, currentTrack } = action.payload;
			const index = tracks.indexOf(currentTrack);
			state.listenedTracks = tracks.slice(0, index);
			state.queueStack = tracks.slice(index + 1);
		})
		.addCase(addTrackInQueue, addInQueue)
		.addDefaultCase(store => store);
});
