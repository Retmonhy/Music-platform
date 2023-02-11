import { Grid } from '@material-ui/core';
import { TrackItem } from './TrackItem';
import { memo } from 'react';
import { ITrack } from '../../../types';
import { useTypedSelector } from '../../../shared';

interface TrackListProps {
	tracks: ITrack[];
}
export const TrackList: React.FC<TrackListProps> = memo(({ tracks }) => {
	//в строчке снизу при клике на плашку, чтобы запустить трек. Меняется стейт преера и перерисовывается компонент.
	//сделать запуск музыки как в вк
	const player = useTypedSelector(st => st.player);
	return (
		<Grid container direction='column'>
			{tracks.map(track => {
				const isActive = player.active?._id === track._id;
				return isActive ? (
					<TrackItem key={track._id} track={track} playerState={player} />
				) : (
					<TrackItem key={track._id} track={track} />
				);
			})}
		</Grid>
	);
});
