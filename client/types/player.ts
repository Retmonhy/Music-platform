import { ITrack } from './track';
export interface PlayerState {
	active: ITrack | null;
	volume: number;
	duration: number;
	currentTime: number;
	pause: boolean;
	isHidrated: boolean;
}

export enum PlayerActionTypes {
	PLAY = 'PLAY',
	PAUSE = 'PAUSE',
	SET_ACTIVE = 'SET_ACTIVE',
	SET_DURATION = 'SET_DURATION',
	SET_CURRENT_TIME = 'SET_CURRENT_TIME',
	SET_VOLUME = 'SET_VOLUME',
}

export interface PlayAction {
	type: PlayerActionTypes.PLAY;
}
export interface PauseAction {
	type: PlayerActionTypes.PAUSE;
}
export interface SetActiveAction {
	type: PlayerActionTypes.SET_ACTIVE;
	payload: ITrack;
}
export interface SetCurrentTimeAction {
	type: PlayerActionTypes.SET_CURRENT_TIME;
	payload: number;
}
export interface SetDurationAction {
	type: PlayerActionTypes.SET_DURATION;
	payload: number;
}
export interface SetVolumeAction {
	type: PlayerActionTypes.SET_VOLUME;
	payload: number;
}
