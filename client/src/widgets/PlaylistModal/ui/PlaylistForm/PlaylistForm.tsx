// libraries
import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
//hooks
import { Control } from 'react-hook-form';
// components
import { ControlledInput, IPlaylistData, useTypedSelector } from '@shared';
import { Local } from '@shared/helper/localization';

interface IPlaylistForm {
	control: Control<IPlaylistData>;
}
export const PlaylistForm: FC<IPlaylistForm> = ({ control }) => {
	const { info } = useTypedSelector(i => i.playlistModal);
	return (
		<Box width={'100%'}>
			<Grid container direction='column'>
				<ControlledInput
					controllerProps={{
						defaultValue: info ? info.name : '',
						control,
						rules: { required: 'Обязательное поле' },
						name: 'name',
					}}
					label={Local.Playlists.Modal.PlaylistName}
				/>
				<ControlledInput
					controllerProps={{
						defaultValue: info ? info.description : '',
						control,
						rules: { required: 'Обязательное поле' },
						name: 'description',
					}}
					label={Local.Playlists.Modal.PlaylistDescription}
				/>
			</Grid>
		</Box>
	);
};
