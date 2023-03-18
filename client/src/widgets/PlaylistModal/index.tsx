// libraries
import React, { FC, MouseEvent, useState } from 'react';
import { Grid } from '@mui/material';
import { Modal } from '@material-ui/core';
//hooks
// components
//styles
import styles from './PlaylistModal.module.scss';
import { PlaylistFooter, PlaylistHeader, PlaylistInfo } from './ui';
import { Control, SubmitHandler, useForm } from 'react-hook-form';

import { PlaylistMusicControl } from './ui/PlaylistMusicControl';
import { IPlaylistPayload } from '../../shared';

interface IPlaylistModalHandlers {
	onClose: (e: MouseEvent<HTMLDivElement>) => void;
	onSave: () => void;
	onUpload: (file: File | null) => Promise<void>;
}
interface IPlaylistModalProps {
	control: Control<IPlaylistPayload>;
	isVisible: boolean;
	cover: string;
	handlers: IPlaylistModalHandlers;
}

export const PlaylistModal: FC<IPlaylistModalProps> = ({
	control,
	isVisible,
	cover,
	handlers,
}) => {
	const { onClose, onSave, onUpload } = handlers;

	if (!isVisible) return null;
	return (
		<Modal
			style={{
				outline: 0,
			}}
			open={true}>
			<Grid container direction='column' className={styles.modal_grid}>
				<PlaylistHeader title='Создание нового плейлиста' onClose={onClose} />
				<PlaylistInfo control={control} onUpload={onUpload} cover={cover} />
				<PlaylistMusicControl />
				<PlaylistFooter title='Сохранить' onClick={onSave} />
			</Grid>
		</Modal>
	);
};
