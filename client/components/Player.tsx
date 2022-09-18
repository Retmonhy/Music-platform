import { Pause, PlayArrow, VolumeUp } from '@material-ui/icons';
import { Grid, IconButton } from '@mui/material';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAction, useTypedSelector } from '../hooks';
import styles from '../styles/Player.module.scss';
import { TrackProgress } from './TrackProgress';
export const Player: React.FC = () => {
	// const track = {
	// 	_id: 'ae233d68-a923-4eb3-a0e3-524975422b67',
	// 	name: 'BestTrack 2',
	// 	artist: 'Alyosha 2',
	// 	text: 'Description 2',
	// 	listens: 2,
	// 	audio: 'ae233d68-a923-4eb3-a0e3-524975422b67.mp3',
	// 	picture: '36ac72ba-0c4d-4063-8bcb-7398b28d682a.jpg',
	// 	comments: [],
	// };
	const qwe = useTypedSelector(state => state.player);
	console.log(qwe);
	console.log(
		'11e = ',
		useSelector(state => state.player),
	);

	const { pauseTrack, playTrack } = useAction();
	const play = () => {
		if (true) {
			playTrack();
		} else {
			pauseTrack();
		}
	};
	return (
		<div className={styles.player}>
			<IconButton onClick={play}>{true ? <PlayArrow /> : <Pause />}</IconButton>
			<Grid
				container
				direction='column'
				style={{ width: '200px', margin: '0 20px' }}>
				<div>{'active.name'}</div>
				<div style={{ color: 'gray', fontSize: '12px' }}>{'active.artist'}</div>
			</Grid>
			<TrackProgress left={0} right={100} onChange={() => {}} />
			<VolumeUp style={{ marginLeft: 'auto' }} />
			<TrackProgress left={0} right={100} onChange={() => {}} />
		</div>
	);
};
