import React, { FC } from 'react';
import { TrackItem, TrackTime } from '../../../../pages/tracks/components';
import { Box, Checkbox, IconButton } from '@mui/material';
import { PlayArrowRounded } from '@material-ui/icons';
import styles from './PltTrack.module.scss';
import { Typography } from '@material-ui/core';
import { PlaylistTrack, useAction } from '@shared';
import { useAppDispatch } from '@shared/store';
interface IPltTrackProps {
	track: PlaylistTrack;
}

export const PltTrack: FC<IPltTrackProps> = ({ track }) => {
	const trackInfo = track.track;
	const dispatch = useAppDispatch();
	const { _playlist } = useAction();
	const toggle = () => dispatch(_playlist.toggleCheckbox(track.track._id));
	return (
		<Box className='playlist-track'>
			<Box className='playlist-track__container'>
				<Box className='playlist-track__info'>
					<Box className='circle_button_wrap'>
						<IconButton className='circle_button'>
							<PlayArrowRounded htmlColor='#fff' fontSize='small' />
						</IconButton>
					</Box>
					<Box>
						<Typography>
							{trackInfo.artist} &ndash; {trackInfo.name}
						</Typography>
					</Box>
				</Box>
				<TrackTime
					currentTime={0}
					duration={trackInfo.duration}
					isActive={false}
				/>
			</Box>
			<Box>
				<Checkbox checked={track.isChecked} onChange={toggle} />
			</Box>
		</Box>
	);
};
