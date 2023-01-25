import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../store/ActionCreators';

export const useAction = () => {
	const dispatch = useDispatch();
	return {
		_player: bindActionCreators(ActionCreators.Player, dispatch),
		_track: bindActionCreators(ActionCreators.Track, dispatch),
		_account: bindActionCreators(ActionCreators.Account, dispatch),
	};
};
