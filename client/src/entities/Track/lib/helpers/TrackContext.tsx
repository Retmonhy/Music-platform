import { createContext } from 'react';
import { ITrack } from '../../model/types';

interface ITrackContext {
	track: ITrack;
}
export const TrackContext = createContext<ITrackContext>(null);
