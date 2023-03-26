import { useTypedSelector } from './useTypedSelector';
import { useAction } from './useAction';

import { useDispatch } from 'react-redux';
import { audio } from '../../pages/_app';
export const usePlayerControl = () => {
	const { _player } = useAction();
	const { pause } = useTypedSelector(st => st.player);
	const dispatch = useDispatch();

	const playControl = () => {
		if (pause) {
			dispatch(_player.playTrack());
			audio.play();
		} else {
			dispatch(_player.pauseTrack());
			audio.pause();
		}
	};
	const playTrack = () => {
		dispatch(_player.playTrack());
		audio.play();
	};
	const pauseTrack = () => {
		dispatch(_player.pauseTrack());
		audio.pause();
	};
	const nextTrack = () => {
		dispatch(_player.startNext());
	};
	const prevTrack = () => {
		dispatch(_player.startPrev());
		audio.currentTime = 0;
	};

	return {
		playControl,
		nextTrack,
		prevTrack,
		playTrack,
		pauseTrack,
	};
};
