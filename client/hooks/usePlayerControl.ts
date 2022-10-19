import { useTypedSelector } from './useTypedSelector';
import { useAction } from './useAction';
import { audio } from './../components/Player';
export const usePlayerControl = () => {
	const { pauseTrack, playTrack } = useAction();
	const { pause } = useTypedSelector(st => st.player);

	const playControl = () => {
		if (pause) {
			playTrack();
			audio.play();
		} else {
			pauseTrack();
			audio.pause();
		}
	};

	return {
		playControl,
	};
};
