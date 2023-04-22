import { Grid, debounce } from '@material-ui/core';
import { TrackItem } from './TrackItem';
import general from '@shared/styles/General.module.scss';
import { memo, useCallback, useEffect, useRef } from 'react';
import {
	ITrack,
	Loader,
	useAction,
	usePlayerControl,
	useTypedSelector,
} from '@shared';
import { useAppDispatch } from '@shared/store';

interface TrackListProps {
	tracks: ITrack[];
}
export const TrackList: React.FC<TrackListProps> = memo(({ tracks }) => {
	//в строчке снизу при клике на плашку, чтобы запустить трек. Меняется стейт преера и перерисовывается компонент.
	//сделать запуск музыки как в вк
	const dispatch = useAppDispatch();
	const player = useTypedSelector(st => st.player);
	const { isLoading } = useTypedSelector(i => i.track);
	const { _player } = useAction();
	const { playControl } = usePlayerControl();
	const clickHandler = useCallback(
		(track: ITrack, isActive: boolean) => {
			if (isActive) {
				playControl();
			}
			if (!isActive) {
				dispatch(_player.setCurrentPlaylist({ tracks, currentTrack: track }));
				dispatch(_player.setActive(track));
				playControl();
			}
		},
		[tracks, playControl],
	);
	return (
		<Grid container direction='column' className={general.relative}>
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
