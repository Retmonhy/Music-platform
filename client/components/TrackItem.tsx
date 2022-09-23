import { ITrack } from '../types/track';
import { Box, Button, IconButton, Card, Grid } from '@material-ui/core';
import styles from '../styles/TrackItem.module.scss';
import { Pause, PlayArrow, Delete } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { setActive } from '../store/ActionCreators/player';
import { useAction, useTypedSelector } from '../hooks';

interface TrackItemProps {
	track: ITrack;
	isActive?: boolean;
}
export const TrackItem: React.FC<TrackItemProps> = ({ track, isActive }) => {
	const router = useRouter();
	const { pauseTrack, playTrack, setActive } = useAction();
	const { active, pause } = useTypedSelector(st => st.player);
	const play = (e: Event) => {
		e.stopPropagation();
		setActive(track);
		playTrack();
	};

	return (
		<Card
			className={styles.track}
			onClick={() => router.push('/tracks/' + track._id)}>
			<IconButton onClick={play}>
				{isActive ? <Pause /> : <PlayArrow />}
			</IconButton>
			<img width={70} height={70} src={track.text} />
			<Grid
				container
				direction='column'
				style={{ width: '200px', margin: '0 20px' }}>
				<div>{track.name}</div>
				<div style={{ color: 'gray', fontSize: '12px' }}>{track.artist}</div>
			</Grid>
			{isActive && <div>2:42 / 3:23</div>}
			<IconButton
				style={{ marginLeft: 'auto  ' }}
				onClick={e => e.stopPropagation()}>
				<Delete />
			</IconButton>
		</Card>
	);
};
