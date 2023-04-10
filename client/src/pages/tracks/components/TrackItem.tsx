//libs
import { memo, MouseEvent, useState, createContext } from 'react';
import { useRouter } from 'next/router';
import { NextThunkDispatch, useAppDispatch } from '@shared/store';
//interface
import { ITrack, PlayerState } from '@shared/types';
//styles
import styles from '@shared/styles/TrackItem.module.scss';
//hooks
import { useAction, useTypedSelector } from '@shared/hooks';
//components
import { Box } from '@material-ui/core';
import { TrackImage } from './TrackImage';
import { TrackTime } from './TrackTime';
import { MusicInfo, merge } from '@shared';
import { ActionRow } from './ActionRow';

interface TrackItemProps {
	track: ITrack;
	playerState?: PlayerState;
	onClick: () => void;
}
interface ITrackContext {
	track: ITrack;
}
export const TrackContext = createContext<ITrackContext>(null);
export const TrackItem: React.FC<TrackItemProps> = memo(
	({ track, playerState, onClick }) => {
		const [isHovered, setHovered] = useState<boolean>(false);
		const { user, accessToken } = useTypedSelector(i => i.account);
		//проверка делаеется уровнем выше,  plaerState не будет передаваться неактивному
		const isActive = playerState ? true : false;
		const router = useRouter();
		const { _player, _account } = useAction();
		const dispatch = useAppDispatch();

		const play = (event: MouseEvent<HTMLDivElement>) => {
			event.stopPropagation();
			onClick();
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
		const handleAddToQueue = (e: MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			dispatch(_player.addTrackInQueue(track));
		};
		const handleHoverOn = () => setHovered(true);
		const handleHoverOff = () => setHovered(false);
		return (
			<TrackContext.Provider value={{ track: track }}>
				<Box
					className={merge(styles.track, isActive ? styles.track__active : '')}
					onMouseEnter={handleHoverOn}
					onMouseLeave={handleHoverOff}
					onClick={play}>
					<TrackImage
						source={track.picture}
						alt={track.text}
						isHover={isHovered}
					/>
					<MusicInfo
						className={styles.trackInfo}
						title={track.name}
						description={track.artist}
						titleClick={navigateToTrackPage}
					/>
					<Box className={styles.trackTime}>
						{isHovered ? (
							<ActionRow
								isActive={isActive}
								isExistInUserMusic={user?.tracks.some(i => i === track._id)}
								handlers={{
									addHandler: handleAddTrack,
									deleteHandler: handleDeleteTrack,
									queueAddHandler: handleAddToQueue,
								}}
							/>
						) : (
							<TrackTime
								isActive={isActive}
								currentTime={playerState?.currentTime}
								duration={track.duration}
							/>
						)}
					</Box>
				</Box>
			</TrackContext.Provider>
		);
	},
);
