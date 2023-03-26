import { Grid } from '@material-ui/core';
import { TrackItem } from './TrackItem';
import { memo } from 'react';
import {
	ITrack,
	useAction,
	usePlayerControl,
	useTypedSelector,
} from '../../../shared';
import { useDispatch } from 'react-redux';
import { audio } from '../../../widgets/Player';

interface TrackListProps {
	tracks: ITrack[];
}
export const TrackList: React.FC<TrackListProps> = memo(({ tracks }) => {
	//в строчке снизу при клике на плашку, чтобы запустить трек. Меняется стейт преера и перерисовывается компонент.
	//сделать запуск музыки как в вк
	const dispatch = useDispatch();
	const player = useTypedSelector(st => st.player);
	const { _player } = useAction();
	const { playControl } = usePlayerControl();
	const clickHandler = (track: ITrack, isActive: boolean) => {
		console.log('isActive = ', isActive);
		if (isActive) {
			playControl();
		}
		if (!isActive) {
			dispatch(_player.setTrackOrder(tracks));
			dispatch(_player.setActive(track));
			playControl();
		}
	};
	return (
		<Grid container direction='column'>
			{tracks.map(track => {
				const isActive = player.active?._id === track._id;
				const onClick = () => {
					clickHandler(track, isActive);
				};
				return isActive ? (
					<TrackItem
						key={track._id}
						track={track}
						onClick={onClick}
						playerState={player}
					/>
				) : (
					<TrackItem key={track._id} track={track} onClick={onClick} />
				);
			})}
		</Grid>
	);
});
