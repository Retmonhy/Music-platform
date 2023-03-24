// libraries
import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
//hooks
import { Control } from 'react-hook-form';
// components
//styles
import { Uploader } from '../Uploader';
import { PlaylistForm } from '../PlaylistForm';
import styles from './../../PlaylistModal.module.scss';
import { IPlaylistData } from '../../../../shared/types';

interface IPlaylistInfoProps {
	control: Control<IPlaylistData>;
	onUpload: (file: File | null) => Promise<void>;
}

export const PlaylistInfo: FC<IPlaylistInfoProps> = ({ onUpload, control }) => {
	return (
		<Box padding='24px'>
			<Grid container direction='row' flexWrap='nowrap' className={styles.grid}>
				<Uploader onUpload={onUpload} />
				<PlaylistForm control={control} />
			</Grid>
		</Box>
	);
};
