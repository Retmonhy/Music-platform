import React, { FC } from 'react';
import { PlaylistTrack } from '../PlaylistTrack';
import { Box, Grid } from '@mui/material';
import styles from './PlaylistMusicControl.module.scss';
interface IPlaylistMusicControlProps {}

export const PlaylistMusicControl: FC<IPlaylistMusicControlProps> = () => {
	return (
		<Box className={styles.control_wrapper}>
			<Grid container flexDirection='column'>
				<PlaylistTrack />
			</Grid>
		</Box>
	);
};
