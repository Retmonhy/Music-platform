import { ITrack } from '../types/track';
import { Box, Button, IconButton, Card, Grid } from '@material-ui/core';
import styles from '../styles/TrackItem.module.scss';
import { Pause, PlayArrow, Delete } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { setActive } from '../store/ActionCreators/player';
import { useAction, useTypedSelector } from '../hooks';
import Image from 'next/image';
import { MouseEventHandler } from 'react';
import { AnchorHTMLAttributes } from 'react';
import axios from 'axios';
import { apiInstance, generateUrl } from '../pages/_app';
import { usePlayerControl } from '../hooks/usePlayerControl';
import { timeConverter } from '../helper';

interface TrackItemProps {
	track: ITrack;
	isActive?: boolean;
}
interface DeleteTrackResponse {
	isSuccess: boolean;
	trackId: string;
}
export const TrackItem: React.FC<TrackItemProps> = ({ track, isActive }) => {
	const router = useRouter();
	const { pauseTrack, playTrack, setActive } = useAction();
	const playerState = useTypedSelector(st => st.player);
	const { active, pause, currentTime, duration } = useTypedSelector(
		st => st.player,
	);
	const { playControl, play: play1 } = usePlayerControl();

	const play = (e: Event) => {
		e.stopPropagation();
		if (active?._id !== track._id) {
			setActive(track);
			return;
		}
		playControl();
	};

	const deleteTrack = async e => {
		e.stopPropagation();
		try {
			const { data } = await apiInstance.delete<DeleteTrackResponse>(
				`/tracks/${track._id}`,
			);
		} catch (error) {
			console.log('deleteTrack ERROR: ', error);
		}
	};

	return (
		<Card
			className={styles.track}
			onClick={() => router.push('/tracks/' + track._id)}>
			<IconButton onClick={play} variant='outlined'>
				{isActive ? pause ? <PlayArrow /> : <Pause /> : <PlayArrow />}
			</IconButton>
			<div>
				<Image
					style={{ borderRadius: '8px' }}
					alt={track.text}
					width={70}
					height={70}
					src={generateUrl(track.picture)}
				/>
			</div>
			<Grid
				container
				direction='column'
				style={{ width: '200px', margin: '0 20px' }}>
				<div>{track.name}</div>
				<div style={{ color: 'gray', fontSize: '12px' }}>{track.artist}</div>
			</Grid>
			{isActive && (
				<div>
					{timeConverter(currentTime)} / {timeConverter(duration)}
				</div>
			)}
			<IconButton style={{ marginLeft: 'auto' }} onClick={deleteTrack}>
				<Delete />
			</IconButton>
		</Card>
	);
};
