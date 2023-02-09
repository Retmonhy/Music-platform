import { ITrack } from '../../../types/track';
import { Grid } from '@material-ui/core';
import styles from '../../../shared/styles/TrackItem.module.scss';
import { useRouter } from 'next/router';
import {
	useAction,
	usePlayerControl,
	useTypedSelector,
} from '../../../shared/hooks';
import { memo, MouseEventHandler, useState } from 'react';
import { TrackTime } from './TrackTime';
import { PlayerState } from '../../../types';
import { TrackImage } from './TrackImage';
import { ActionMenu } from './ActionMenu';
import { DeleteTrack } from './DeleteTrack';
import { useDispatch } from 'react-redux';
import { NextThunkDispatch } from '../../../store';
import { AddTrack } from './AddTrack';
import { AccountService } from '../../../shared';

interface TrackItemProps {
	track: ITrack;
	playerState?: PlayerState;
}
export const TrackItem: React.FC<TrackItemProps> = memo(
	({ track, playerState }) => {
		const [isHovered, setHovered] = useState<boolean>(false);
		const { userTracks, accessToken } = useTypedSelector(i => i.account);
		//проверка делаеется уровнем выше,  plaerState не будет передаваться неактивному
		const isActive = playerState ? true : false;
		const router = useRouter();
		const { _player, _track, _account } = useAction();

		const { playControl } = usePlayerControl();
		const dispatch = useDispatch() as NextThunkDispatch;

		const play: MouseEventHandler<HTMLDivElement> = event => {
			event.stopPropagation();
			if (!isActive) {
				dispatch(_player.setActive(track));
				return;
			}
			playControl();
		};

		// const handleDeleteTrack = e => {
		// 	e.stopPropagation();
		// 	dispatch(_track.deleteTrack(track));
		// };
		const handleAddTrack = e => {
			e.stopPropagation();
			dispatch(_account.addTrackIntoMyMusic(track._id));
		};
		return (
			<div
				className={styles.track}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onClick={play}>
				<TrackImage
					source={track.picture}
					alt={track.text}
					isHover={isHovered}
				/>
				<div className={styles.trackInfo}>
					<Grid container direction='column'>
						<div>
							<span
								onClick={() => router.push('/tracks/' + track._id)}
								className={styles.trackTitle}>
								{track.name}
							</span>
						</div>
						<div className={styles.gray}>{track.artist}</div>
					</Grid>
				</div>
				<div className={styles.trackTime}>
					{isHovered ? (
						<div className={styles.actionMenu}>
							{userTracks.some(i => {
								return i._id === track._id;
							}) ? (
								<DeleteTrack onClick={() => {}} />
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
