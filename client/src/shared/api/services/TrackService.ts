import {
	api,
	ICreateTrackResponse,
	IDeleteTrackResponse,
	TrackEndpoints,
} from '..';
import { ITrack } from '../../types';
export class TrackService {
	static fetchTracksReq = () => {
		return api.get<ITrack[]>(TrackEndpoints.TRACKS);
	};
	static createTrack = payload => {
		return api.post<ICreateTrackResponse>(TrackEndpoints.CREATE_TRACK, payload);
	};
	static deleteTrackReq = (trackId: string) => {
		return api.delete<IDeleteTrackResponse>(`/tracks/${trackId}`);
	};
	static searchTracksReq = (query: string) => {
		return api.get<ITrack[]>(TrackEndpoints.SEARCH + `?query=${query}`);
	};
}
