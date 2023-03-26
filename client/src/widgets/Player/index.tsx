import {
	Pause,
	PlayArrowRounded,
	SkipNextRounded,
	SkipPreviousRounded,
	VolumeUp,
} from '@material-ui/icons';
import { Box, IconButton, IconButtonProps } from '@mui/material';
import { FC, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { generateUrl } from '../../shared/api';
import { timeConverter } from '../../shared/helper';
import {
	useAction,
	usePlayerControl,
	useTypedSelector,
} from '../../shared/hooks';
import styles from './Player.module.scss';
import { TrackProgress } from '../TrackProgress';
import general from './../../shared/styles/General.module.scss';
import { audio, setAudioInstance } from '../../pages/_app';

export const Player: React.FC = () => {
	const { active, currentTime, duration, pause, volume } = useTypedSelector(
		state => state.player,
	);
	const dispatch = useDispatch();
	const { playControl, nextTrack, prevTrack, playTrack } = usePlayerControl();
	const { setCurrentTime, setDuration, setVolume } = useAction()._player;
	// const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
	// 	audio.volume = Number(e.target.value) / 100;
	// 	setVolume(Number(e.target.value));
	// };
	// const changeCurrentTime = (e: ChangeEvent<HTMLInputElement>) => {
	// 	audio.currentTime = Number(e.target.value);
	// 	dispatch(setCurrentTime(Number(e.target.value)));
	// };
	useEffect(() => {
		if (!audio) {
			setAudioInstance(new Audio());
		}
		console.log('useEffect = ', active);
		setAudio();
		playTrack();
	}, [active]);

	const setAudio = () => {
		audio.src = generateUrl(active?.audio);
		// audio.volume = volume / 100;
		// audio.onloadedmetadata = () => {
		// 	dispatch(setDuration(audio.duration));
		// };
		// audio.ontimeupdate = () => {
		// 	dispatch(setCurrentTime(audio.currentTime));
		// };
	};
	const playPrevTrack = e => {
		e.stopPropagation();
		prevTrack();
	};
	const playPause = e => {
		e.stopPropagation();
		playControl();
	};
	const playNextTrack = e => {
		e.stopPropagation();
		nextTrack();
	};
	const playerClick = e => {
		e.stopPropagation();
	};
	return active ? (
		<Box className={styles.player} onClick={playerClick}>
			<Box className={styles.player__wrapper}>
				<CustomIconBtn onClick={playPrevTrack}>
					<SkipPreviousRounded className={general.iconButton} />
				</CustomIconBtn>

				<CustomIconBtn onClick={playPause}>
					{pause ? (
						<PlayArrowRounded className={general.iconButton} />
					) : (
						<Pause className={general.iconButton} />
					)}
				</CustomIconBtn>

				<CustomIconBtn onClick={playNextTrack}>
					<SkipNextRounded className={general.iconButton} />
				</CustomIconBtn>

				<Box className={styles.player__text}>
					{active.artist} &ndash; {active?.name}
				</Box>
			</Box>
		</Box>
	) : null;
};

{
	/* <IconButton onClick={playControl}>
				{pause ? <PlayArrowRounded /> : <Pause />}
			</IconButton>
			<Grid
				container
				direction='column'
				style={{ width: '200px', margin: '0 20px' }}>
				<div>{active?.name}</div>	
				<div style={{ color: 'gray', fontSize: '12px' }}>{active?.artist}</div>
			</Grid>
			<TrackProgress
				left={currentTime}
				right={duration}
				onChange={changeCurrentTime}
				converter={timeConverter}
			/>
			<VolumeUp style={{ marginLeft: 'auto' }} />
			<TrackProgress left={volume} right={100} onChange={changeVolume} /> */
}

interface ICustomIconBtn extends IconButtonProps {
	children: ReactNode;
}
const CustomIconBtn: FC<ICustomIconBtn> = ({ children, ...props }) => {
	return (
		<IconButton
			{...props}
			disableRipple
			disableFocusRipple
			style={{ padding: 0 }}>
			{children}
		</IconButton>
	);
};
