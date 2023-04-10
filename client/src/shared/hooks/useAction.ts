import ActionCreators from '../store/ActionCreators';

export const useAction = () => {
	return {
		_player: ActionCreators.Player,
		_track: ActionCreators.Track,
		_account: ActionCreators.Account,
		_playlist: ActionCreators.Playlists,
	};
};
