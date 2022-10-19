import { Pause, PlayArrow, VolumeUp } from '@material-ui/icons';
import { Grid, IconButton } from '@mui/material';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { timeConverter } from '../helper';
import { useAction, usePlayerControl, useTypedSelector } from '../hooks';
import { generateUrl } from '../pages/_app';
import styles from '../styles/Player.module.scss';
import { TrackProgress } from './TrackProgress';

export let audio: HTMLAudioElement;
export const Player: React.FC = () => {
	const { active, currentTime, duration, pause, volume } = useTypedSelector(
		state => state.player,
	);
	const playerState = useTypedSelector(state => state.player);
	const { playControl, play } = usePlayerControl();
	const { pauseTrack, playTrack, setCurrentTime, setDuration, setVolume } =
		useAction();
	const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
		audio.volume = Number(e.target.value) / 100;
		setVolume(Number(e.target.value));
	};
	const changeCurrentTime = (e: ChangeEvent<HTMLInputElement>) => {
		audio.currentTime = Number(e.target.value);
		setCurrentTime(Number(e.target.value));
	};
	useEffect(() => {
		if (!audio) {
			audio = new Audio();
		}
		setAudio();
		playControl();

		console.log('useEffect = ', active?._id);
	}, [active]);

	const setAudio = () => {
		audio.src = generateUrl(active?.audio);
		audio.volume = volume / 100;
		audio.onloadedmetadata = () => {
			setDuration(audio.duration);
		};
		audio.ontimeupdate = () => {
			setCurrentTime(audio.currentTime);
		};
	};
	return active ? (
		<div className={styles.player}>
			<IconButton onClick={playControl}>
				{pause ? <PlayArrow /> : <Pause />}
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
			<TrackProgress left={volume} right={100} onChange={changeVolume} />
		</div>
	) : null;
};
