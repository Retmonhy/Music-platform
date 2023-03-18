// libraries
import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
//hooks
import { Control } from 'react-hook-form';
// components
import { ControlledInput, IPlaylistPayload } from '../../../../shared';
//styles
import styles from './PlaylistModal.module.scss';
import general from '../../styles/General.module.scss';

interface IPlaylistForm {
	control: Control<IPlaylistPayload>;
}
export const PlaylistForm: FC<IPlaylistForm> = ({ control }) => {
	return (
		<Box width={'100%'}>
			<Grid container direction='column'>
				<ControlledInput
					controllerProps={{
						control,
						rules: { required: 'Обязательное поле' },
						name: 'name',
					}}
					label='Название плейлиста'
				/>
				<ControlledInput
					controllerProps={{
						control,
						rules: { required: 'Обязательное поле' },
						name: 'description',
					}}
					label='Описание плейлиста'
				/>
			</Grid>
		</Box>
	);
};
