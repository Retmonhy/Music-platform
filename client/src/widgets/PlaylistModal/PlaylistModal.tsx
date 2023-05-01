// libraries
import React, { FC, MouseEvent, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Modal } from '@material-ui/core';
//hooks
// components
import { PlaylistFooter, PlaylistHeader, PlaylistInfo } from './ui';
import { Control } from 'react-hook-form';

import { PlaylistMusicControl } from './ui/PlaylistMusicControl/PlaylistMusicControl';
import { IPlaylistData, useAction, useTypedSelector } from '@shared';
import { useAppDispatch } from '@shared/store';
import { Local } from '@shared/helper/localization';

interface IPlaylistModalHandlers {
	onClose: (e: MouseEvent<HTMLDivElement>) => void;
	onSave: () => void;
	onUpload: (file: File | null) => Promise<void>;
}
interface IPlaylistModalProps {
	control: Control<IPlaylistData>;
	isVisible: boolean;
	handlers: IPlaylistModalHandlers;
}

const PlaylistModal: FC<IPlaylistModalProps> = ({
	control,
	isVisible,
	handlers,
}) => {
	const { onClose, onSave, onUpload } = handlers;
	const { selectedTracks } = useTypedSelector(i => i.playlistModal);
	const { _playlist } = useAction();
	const dispatch = useAppDispatch();
	useEffect(() => {
		//сбрасываем стейт при закрытии модалки
		if (!isVisible) {
			dispatch(_playlist.resetModalState());
		}
	}, [isVisible]);
	return (
		<Modal
			style={{
				outline: 0,
			}}
			open={isVisible}
			className='playlist-modal'>
			<Grid container direction='column' className='playlist-modal__grid'>
				<PlaylistHeader
					title={Local.Playlists.Modal.CreationTitle}
					onClose={onClose}
				/>
				<PlaylistInfo control={control} onUpload={onUpload} />
				<PlaylistMusicControl tracks={selectedTracks} />
				<PlaylistFooter title={Local.General.Save} onClick={onSave} />
			</Grid>
		</Modal>
	);
};
export default PlaylistModal;
export { PlaylistModal };
