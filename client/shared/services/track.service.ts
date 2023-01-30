import { ITrack } from '../../types';
import { api, IDeleteTrackResponse, TrackEndpoints } from '../api';
export class TrackService {
	static fetchTracks = () => {
		return api.get<ITrack[]>(TrackEndpoints.TRACKS);
	};
	static deleteTrack = (trackId: string) => {
		return api.delete<IDeleteTrackResponse>(`/tracks/${trackId}`);
	};
	static searchTracks = (query: string) => {
		return api.get<ITrack[]>(TrackEndpoints.SEARCH + `?query=${query}`);
	};
}
