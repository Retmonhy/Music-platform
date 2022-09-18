//action creators - это просто функции которые возвращают action
// action - протсо обЪект

import { PlayerActionTypes } from '../../types/player';
import { ITrack } from '../../types/track';

export const playTrack = () => {
	return { type: PlayerActionTypes.PLAY };
};
export const pauseTrack = () => {
	return { type: PlayerActionTypes.PAUSE };
};
export const setDuration = (payload: number) => {
	return { type: PlayerActionTypes.SET_DURATION, payload };
};
export const setActive = (payload: ITrack) => {
	return { type: PlayerActionTypes.SET_ACTIVE, payload };
};
export const setVolume = (payload: number) => {
	return { type: PlayerActionTypes.SET_VOLUME, payload };
};
export const setCurrentTime = (payload: number) => {
	return { type: PlayerActionTypes.SET_CURRENT_TIME, payload };
};
