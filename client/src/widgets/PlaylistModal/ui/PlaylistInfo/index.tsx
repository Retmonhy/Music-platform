// libraries
import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
//hooks
import { Control } from 'react-hook-form';
// components
//styles
import { Uploader } from '../Uploader';
import { PlaylistForm } from '../PlaylistForm';
import { IPlaylistPayload } from '../../../../types';

interface PlaylistInfoProps {
	cover: string;
	control: Control<IPlaylistPayload>;
	onUpload: (file: File | null) => Promise<void>;
}

export const PlaylistInfo: FC<PlaylistInfoProps> = ({
	onUpload,
	cover,
	control,
}) => {
	return (
		<Box padding='24px'>
			<Grid container direction='row' flexWrap='nowrap'>
				<Uploader onUpload={onUpload} cover={cover} />
				<PlaylistForm control={control} />
			</Grid>
		</Box>
	);
};
