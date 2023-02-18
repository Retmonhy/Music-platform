import { ITrack } from '../../../types';
import { api, IDeleteTrackResponse, TrackEndpoints } from '..';
export class TrackService {
	static fetchTracksReq = () => {
		return api.get<ITrack[]>(TrackEndpoints.TRACKS);
	};
	static deleteTrackReq = (trackId: string) => {
		return api.delete<IDeleteTrackResponse>(`/tracks/${trackId}`);
	};
	static searchTracksReq = (query: string) => {
		return api.get<ITrack[]>(TrackEndpoints.SEARCH + `?query=${query}`);
	};
}
