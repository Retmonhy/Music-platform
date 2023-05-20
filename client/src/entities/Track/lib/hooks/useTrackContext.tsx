import { useContext } from 'react';
import { TrackContext } from '../helpers';

export const useTrackContext = () => {
	const trackContext = useContext(TrackContext);
	return trackContext;
};
