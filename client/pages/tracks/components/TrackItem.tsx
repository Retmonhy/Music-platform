import { ITrack } from '../../../types/track';
import { Grid } from '@material-ui/core';
import styles from '../../../shared/styles/TrackItem.module.scss';
import { useRouter } from 'next/router';
import {
	useAction,
	usePlayerControl,
	useTypedSelector,
} from '../../../shared/hooks';
import { memo, MouseEvent, useState } from 'react';
import { TrackTime } from './TrackTime';
import { PlayerState } from '../../../types';
import { TrackImage } from './TrackImage';
import { ActionMenu } from './ActionMenu';
import { DeleteTrack } from './DeleteTrack';
import { useDispatch } from 'react-redux';
import { NextThunkDispatch } from '../../../store';
import { AddTrack } from './AddTrack';

interface TrackItemProps {
	track: ITrack;
	playerState?: PlayerState;
}
export const TrackItem: React.FC<TrackItemProps> = memo(
	({ track, playerState }) => {
		const [isHovered, setHovered] = useState<boolean>(false);
		const { user, accessToken } = useTypedSelector(i => i.account);
		//проверка делаеется уровнем выше,  plaerState не будет передаваться неактивному
		const isActive = playerState ? true : false;
		const router = useRouter();
		const { _player, _track, _account } = useAction();

		const { playControl } = usePlayerControl();
		const dispatch = useDispatch() as NextThunkDispatch;

		const play = (event: MouseEvent<HTMLDivElement>) => {
			event.stopPropagation();
			if (!isActive) {
				dispatch(_player.setActive(track));
				return;
			}
			playControl();
		};
		const navigateToTrackPage = (e: MouseEvent<HTMLSpanElement>) => {
			e.stopPropagation();
			router.push('/tracks/' + track._id);
		};
		const handleDeleteTrack = (e: MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			dispatch(_account.removeTrackFromMyMusic(track._id));
		};
		const handleAddTrack = (e: MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			dispatch(_account.addTrackIntoMyMusic(track._id));
		};
		const handleHoverOn = () => setHovered(true);
		const handleHoverOff = () => setHovered(false);
		return (
			<div
				className={styles.track}
				onMouseEnter={handleHoverOn}
				onMouseLeave={handleHoverOff}
				onClick={play}>
				<TrackImage
					source={track.picture}
					alt={track.text}
					isHover={isHovered}
				/>
				<div className={styles.trackInfo}>
					<Grid container direction='column'>
						<div>
							<span onClick={navigateToTrackPage} className={styles.trackTitle}>
								{track.name}
							</span>
						</div>
						<div className={styles.gray}>{track.artist}</div>
					</Grid>
				</div>
				<div className={styles.trackTime}>
					{isHovered ? (
						<div className={styles.actionMenu}>
							{user?.tracks.some(i => i === track._id) ? (
								<DeleteTrack onClick={handleDeleteTrack} />
							) : (
								<AddTrack onClick={handleAddTrack} />
							)}

							<ActionMenu />
						</div>
					) : (
						<TrackTime
							isActive={isActive}
							currentTime={playerState?.currentTime}
							duration={track.duration}
						/>
					)}
				</div>
			</div>
		);
	},
);
