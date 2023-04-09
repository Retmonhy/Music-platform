// libraries
import React, { FC, MouseEvent, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Modal } from '@material-ui/core';
//hooks
// components
//styles
import styles from './PlaylistModal.module.scss';
import { PlaylistFooter, PlaylistHeader, PlaylistInfo } from './ui';
import { Control } from 'react-hook-form';

import { PlaylistMusicControl } from './ui/PlaylistMusicControl';
import { IPlaylistData, useAction, useTypedSelector } from '@shared';
import { useDispatch } from 'react-redux';

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

export const PlaylistModal: FC<IPlaylistModalProps> = ({
	control,
	isVisible,
	handlers,
}) => {
	const { onClose, onSave, onUpload } = handlers;
	const { selectedTracks } = useTypedSelector(i => i.playlist);
	const { _playlist } = useAction();
	const dispatch = useDispatch();
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
			open={isVisible}>
			<Grid container direction='column' className={styles.modal_grid}>
				<PlaylistHeader title='Создание нового плейлиста' onClose={onClose} />
				<PlaylistInfo control={control} onUpload={onUpload} />
				<PlaylistMusicControl tracks={selectedTracks} />
				<PlaylistFooter title='Сохранить' onClick={onSave} />
			</Grid>
		</Modal>
	);
};
