export interface IComment {
	_id: string;
	username: string;
	text: string;
}
export interface ITrack {
	_id: string;
	artist: string;
	name: string;
	text: string;
	listens: number;
	picture: string;
	audio: string;
	duration: number;
	comments: IComment[];
}

export interface TrackState {
	tracks: ITrack[];
	isLoading: boolean;
	error: string;
}

export enum TrackActionTypes {
	FETCH_TRACKS = 'FETCH_TRACKS',
	FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
	DELETE_TRACK = 'DELETE_TRACK',
}

export interface FetchTracksAction {
	type: TrackActionTypes.FETCH_TRACKS;
	payload: ITrack[];
}
export interface DeleteTrackAction {
	type: TrackActionTypes.DELETE_TRACK;
	payload: ITrack;
}

export interface FetchErrorTracksAction {
	type: TrackActionTypes.FETCH_TRACKS_ERROR;
	payload: string;
}
