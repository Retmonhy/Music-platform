import { Pause, PlayArrow, VolumeUp } from '@material-ui/icons';
import { Grid, IconButton } from '@mui/material';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAction, useTypedSelector } from '../hooks';
import styles from '../styles/Player.module.scss';
import { TrackProgress } from './TrackProgress';

let audio: HTMLAudioElement;
export const Player: React.FC = () => {
	const track = {
		_id: 'ae233d68-a923-4eb3-a0e3-524975422b67',
		name: 'BestTrack 2',
		artist: 'Alyosha 2',
		text: 'Description 2',
		listens: 2,
		audio:
			'http://localhost:5000/audio/ae233d68-a923-4eb3-a0e3-524975422b69.mp3',
		picture: '36ac72ba-0c4d-4063-8bcb-7398b28d682a.jpg',
		comments: [],
	};
	const { active, currentTime, duration, pause, volume } = useTypedSelector(
		state => state.player,
	);
	console.log(
		'!!!! = ',
		useTypedSelector(state => state.player),
	);
	const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
		setVolume(Number(e.target.value));
		audio.volume = Number(e.target.value) / 100;
	};
	const changeCurrentTime = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentTime(Number(e.target.value));
		audio.currentTime = Number(e.target.value);
	};
	useEffect(() => {
		if (!audio) {
			audio = new Audio();
		} else {
			setAudio();
			play();
		}
	}, [active]);

	const setAudio = () => {
		audio.src = active?.audio;
		audio.volume = volume / 100;
		audio.onloadedmetadata = () => {
			setDuration(audio.duration);
		};
		audio.ontimeupdate = () => {
			setDuration(audio.currentTime);
		};
	};
	const { pauseTrack, playTrack, setCurrentTime, setDuration, setVolume } =
		useAction();

	const play = () => {
		if (pause) {
			playTrack();
			audio.play();
		} else {
			pauseTrack();
			audio.pause();
		}
	};
	return active ? (
		<div className={styles.player}>
			<IconButton onClick={play}>
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
				left={Math.ceil(currentTime)}
				right={Math.ceil(duration)}
				onChange={changeCurrentTime}
			/>
			<VolumeUp style={{ marginLeft: 'auto' }} />
			<TrackProgress left={volume} right={100} onChange={changeVolume} />
		</div>
	) : null;
};
