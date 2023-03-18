import { Dispatch } from '@reduxjs/toolkit';
import { useTypedSelector } from './useTypedSelector';
import { useAction } from './useAction';

import { useDispatch } from 'react-redux';
import { audio } from '../../widgets/Player';
export const usePlayerControl = () => {
	const { pauseTrack, playTrack } = useAction()._player;
	const { pause } = useTypedSelector(st => st.player);
	const dispatch = useDispatch();

	const playControl = () => {
		if (pause) {
			dispatch(playTrack());
			audio.play();
		} else {
			dispatch(pauseTrack());
			audio.pause();
		}
	};

	return {
		playControl,
	};
};
