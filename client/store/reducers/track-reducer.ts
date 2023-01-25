import {
	ITrack,
	TrackState,
	TrackAction,
	TrackActionTypes,
} from '../../types/track';
const initialState: TrackState = {
	tracks: [],
	error: '',
};

export const trackReducer = (
	state = initialState,
	action: TrackAction,
): TrackState => {
	switch (action.type) {
		case TrackActionTypes.FETCH_TRACKS:
			return { error: '', tracks: action.payload };
		case TrackActionTypes.DELETE_TRACK:
			return {
				error: '',
				tracks: state.tracks.filter(i => i._id !== action.payload._id),
			};
		case TrackActionTypes.FETCH_TRACKS_ERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};
