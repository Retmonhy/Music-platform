// libraries
import React, { FC, MouseEvent, useState } from 'react';
import { Grid } from '@mui/material';
import { Modal } from '@material-ui/core';
//hooks
// components
//styles
import styles from './PlaylistModal.module.scss';
import { PlaylistFooter, PlaylistHeader, PlaylistInfo } from './ui';
import { useForm } from 'react-hook-form';
import { IPlaylistPayload } from '../../types';
import { FileService, UploadActionType } from '../../shared';

interface IPlaylistModalHandlers {
	onClose: (e: MouseEvent<HTMLDivElement>) => void;
	onSave: (payload: IPlaylistPayload) => void;
	onUpload: (file: File | null) => Promise<void>;
}
interface IPlaylistModalProps {
	isVisible: boolean;
	cover: string;
	handlers: IPlaylistModalHandlers;
}

export const PlaylistModal: FC<IPlaylistModalProps> = ({
	isVisible,
	cover,
	handlers,
}) => {
	const { onClose, onSave, onUpload } = handlers;
	const onInvalid = () => console.log('inValid');
	const { control, handleSubmit } = useForm<IPlaylistPayload>({
		mode: 'onSubmit',
	});

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
				<PlaylistFooter
					title='Сохранить'
					onClick={handleSubmit(onSave, onInvalid)}
				/>
			</Grid>
		</Modal>
	);
};
