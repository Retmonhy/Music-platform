import { createAction } from '@reduxjs/toolkit';
//action creators - это просто функции которые возвращают action
// action - протсо обЪект

import { PlayerActionTypes } from '../../types/player';
import { ITrack } from '../../types/track';

export const playTrack = createAction(PlayerActionTypes.PLAY);
export const pauseTrack = createAction(PlayerActionTypes.PAUSE);

export const setDuration = createAction<number>(PlayerActionTypes.SET_DURATION);
export const setActive = createAction<ITrack>(PlayerActionTypes.SET_ACTIVE);
export const setVolume = createAction<number>(PlayerActionTypes.SET_VOLUME);
export const setCurrentTime = createAction<number>(
	PlayerActionTypes.SET_CURRENT_TIME,
);
