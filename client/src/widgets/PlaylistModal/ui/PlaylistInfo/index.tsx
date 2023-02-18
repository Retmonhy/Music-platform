// libraries
import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
//hooks
import { Control, useForm } from 'react-hook-form';
// components
//styles
import styles from './PlaylistModal.module.scss';
import general from '../../styles/General.module.scss';
import { Uploader } from '../Uploader';
import { PlaylistForm } from '../PlaylistForm';
import { IPlaylistPayload } from '../../model';

interface PlaylistInfoProps {
	control: Control<IPlaylistPayload>;
}
export const PlaylistInfo: FC<PlaylistInfoProps> = ({ control }) => {
	return (
		<Box padding='24px'>
			<Grid container direction='row' flexWrap='nowrap'>
				<Uploader setFile={() => {}} file={null} control={control} />
				<PlaylistForm control={control} />
			</Grid>
		</Box>
	);
};
