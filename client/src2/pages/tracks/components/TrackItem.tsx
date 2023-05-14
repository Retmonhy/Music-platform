//libs
import { useRouter } from 'next/router';
import { useAppDispatch } from '@shared/store';
import { memo, MouseEvent, useState, createContext } from 'react';
//interface
import { ITrack, PlayerState } from '@shared/types';
//hooks
import { useAction, useTypedSelector, useIsMobile } from '@shared/hooks';
//components
import { TrackTime } from './TrackTime';
import { ActionRow } from './ActionRow';
import { TrackImage } from './TrackImage';
import { Loader, MusicInfo, merge } from '@shared';

import { MoreVert } from '@mui/icons-material';
import { IconButton, Box } from '@mui/material';
import dynamic from 'next/dynamic';

const DynamicTrackBottomSheet = dynamic(
	() => import('./TrackBottomSheet/TrackBottomSheet'),
	{ loading: () => <Loader /> },
);
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
		const isMobile = useIsMobile();
		const [isHovered, setHovered] = useState<boolean>(false);
		const { user, accessToken } = useTypedSelector(i => i.account);
		//проверка делаеется уровнем выше,  plaerState не будет передаваться неактивному
		const isActive = playerState ? true : false;
		const router = useRouter();
		const { _player, _account } = useAction();
		const dispatch = useAppDispatch();

		const play = (event: MouseEvent<HTMLDivElement>) => {
			console.log('click trackitem');
			event.stopPropagation();
			onClick();
		};
		const handleNavigateToTrack = () => {
			router.push('/tracks/' + track._id);
		};
		const navigateToTrackPage = (e: MouseEvent<HTMLSpanElement>) => {
			e.stopPropagation();
			handleNavigateToTrack();
		};
		const handleDeleteTrack = () => {
			dispatch(_account.removeTrackFromMyMusic(track._id));
		};
		const handleAddTrack = () => {
			dispatch(_account.addTrackIntoMyMusic(track._id));
		};
		const handleAddToQueue = () => {
			dispatch(_player.addTrackInQueue(track));
		};
		const handleHoverOn = () => setHovered(true);
		const handleHoverOff = () => setHovered(false);
		//forMobile
		const [isBSOpened, setBSOpened] = useState<boolean>(false);
		const openBSHandler = e => {
			console.log('openBS');
			e.stopPropagation();
			e.preventDefault();
			setBSOpened(true);
		};
		const closeBS = () => setBSOpened(false);
		return (
			<TrackContext.Provider value={{ track: track }}>
				<Box
					className={merge('track track_item', isActive ? 'track_active' : '')}
					onMouseEnter={handleHoverOn}
					onMouseLeave={handleHoverOff}
					onClick={play}>
					<TrackImage
						source={track.picture}
						alt={track.text}
						isHover={isHovered}
					/>
					<MusicInfo
						className='track__info'
						title={track.name}
						description={track.artist}
						titleClick={navigateToTrackPage}
					/>
					{isMobile ? (
						<Box className='track__time'>
							<IconButton
								onClick={openBSHandler}
								aria-label='show more trackcontrols'>
								<MoreVert className='icon-button' />
							</IconButton>
							{isBSOpened && (
								<DynamicTrackBottomSheet
									open={isBSOpened}
									onClose={closeBS}
									isExistInUserMusic={user?.tracks.some(i => i === track._id)}
									handlers={{
										addHandler: handleAddTrack,
										deleteHandler: handleDeleteTrack,
										queueAddHandler: handleAddToQueue,
										navigateToTrackPage: handleNavigateToTrack,
									}}
								/>
							)}
						</Box>
					) : (
						<Box className='track__time'>
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
					)}
				</Box>
			</TrackContext.Provider>
		);
	},
);
export default TrackItem;
