import React, { FC } from 'react';
import { TrackItem, TrackTime } from '../../../../pages/tracks/components';
import { Box, IconButton } from '@mui/material';
import { PlayArrowRounded } from '@material-ui/icons';
import styles from './PlaylistTrack.module.scss';
import { Typography } from '@material-ui/core';
interface IPlaylistTrackProps {}

export const PlaylistTrack: FC<IPlaylistTrackProps> = () => {
	return (
		<>
			<Box
				className={styles.playlist_track}
				// onMouseEnter={handleHoverOn}
				// onMouseLeave={handleHoverOff}
				// onClick={play}
			>
				<Box className={styles.track_info}>
					<Box className={styles.circle_button_wrap}>
						<IconButton className={styles.circle_button}>
							<PlayArrowRounded htmlColor='#fff' fontSize='small' />
						</IconButton>
					</Box>
					<Box className={styles.a}>
						<Typography>Artist &ndash; track name</Typography>
					</Box>
				</Box>
				<TrackTime currentTime={0} duration={122} isActive={false} />
			</Box>
		</>
	);
};
