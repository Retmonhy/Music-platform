import { ITrack } from '../../types';
import { api, IDeleteTrackResponse, TrackEndpoints } from '../api';
export class TrackService {
	static fetchTracks = async () => {
		return api.get<ITrack[]>(TrackEndpoints.TRACKS);
	};
	static deleteTrack = async (trackId: string) => {
		return api.delete<IDeleteTrackResponse>(`/tracks/${trackId}`);
	};
	static searchTracks = async (query: string) => {
		return api.get<ITrack[]>(TrackEndpoints.SEARCH + `?query=${query}`);
	};
}
