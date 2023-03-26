import React, { FC } from 'react';
import { PltTrack } from '../PltTrack';
import { Box, Grid } from '@mui/material';
import styles from './PlaylistMusicControl.module.scss';
import { PlaylistTrack } from '../../../../shared';
interface IPlaylistMusicControlProps {
	tracks: PlaylistTrack[];
}

export const PlaylistMusicControl: FC<IPlaylistMusicControlProps> = ({
	tracks,
}) => {
	return (
		<Box className={styles.control_wrapper}>
			<Grid container flexDirection='column'>
				{tracks.map(track => {
					return <PltTrack key={track.track._id} track={track} />;
				})}
			</Grid>
		</Box>
	);
};