import {
	api,
	ICreateTrackResponse,
	IDeleteTrackResponse,
	IPaginationParams,
	ISearchRequest,
	TrackEndpoints,
} from '..';
import { ITrack } from '@shared/types';
export class TrackService {
	static fetchTracksReq = (params: IPaginationParams) => {
		return api.get<ITrack[]>(TrackEndpoints.TRACKS, { params });
	};
	static createTrack = payload => {
		return api.post<ICreateTrackResponse>(TrackEndpoints.CREATE_TRACK, payload);
	};
	static deleteTrackReq = (trackId: string) => {
		return api.delete<IDeleteTrackResponse>(`/tracks/${trackId}`);
	};
	static searchTracksReq = (payload: ISearchRequest) => {
		return api.get<ITrack[]>(TrackEndpoints.SEARCH, { params: { ...payload } });
	};
}
