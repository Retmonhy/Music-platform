import { Dispatch } from '@reduxjs/toolkit';
import { useTypedSelector } from './useTypedSelector';
import { useAction } from './useAction';
import { audio } from '../../components/Player';
import { useDispatch } from 'react-redux';
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
