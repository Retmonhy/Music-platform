import { ITrack } from './track';
export interface PlayerState {
	active: ITrack | null;
	volume: number;
	duration: number;
	currentTime: number;
	pause: boolean;
	isHidrated: boolean;
	trackOrder: ITrack[];
}

export enum PlayerActionTypes {
	PLAY = 'PLAY',
	PAUSE = 'PAUSE',
	START_NEXT = 'START_NEXT',
	START_PREV = 'START_PREV',
	SET_ACTIVE = 'SET_ACTIVE',
	SET_DURATION = 'SET_DURATION',
	SET_CURRENT_TIME = 'SET_CURRENT_TIME',
	SET_VOLUME = 'SET_VOLUME',
	SET_TRACK_ORDER = 'SET_TRACK_ORDER',
	ADD_TRACK_IN_ORDER_TOP = 'ADD_TRACK_IN_ORDER_TOP',
}
