// libraries
import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
//hooks
import { Control } from 'react-hook-form';
// components
//styles
import { Uploader } from '../Uploader/Uploader';
import { PlaylistForm } from '../PlaylistForm/PlaylistForm';
import styles from './../../PlaylistModal.module.scss';
import { IPlaylistData } from '@shared/types';

interface IPlaylistInfoProps {
	control: Control<IPlaylistData>;
	onUpload: (file: File | null) => Promise<void>;
}

export const PlaylistInfo: FC<IPlaylistInfoProps> = ({ onUpload, control }) => {
	return (
		<Box padding='24px'>
			<Grid container direction='row' flexWrap='nowrap'>
				<Uploader onUpload={onUpload} />
				<PlaylistForm control={control} />
			</Grid>
		</Box>
	);
};
