// libraries
import React, { FC, MouseEvent } from 'react';
import { Grid } from '@mui/material';
import { Modal } from '@material-ui/core';
//hooks
// components
//styles
import styles from './PlaylistModal.module.scss';
import { PlaylistFooter, PlaylistHeader, PlaylistInfo } from './ui';
import { useForm } from 'react-hook-form';
import { IPlaylistPayload } from './model';

interface IPlaylistModalProps {
	isVisible: boolean;
	onClose: (e: MouseEvent<HTMLDivElement>) => void;
	onSave: (payload: IPlaylistPayload) => void;
}

export const PlaylistModal: FC<IPlaylistModalProps> = ({
	isVisible,
	onClose,
	onSave,
}) => {
	if (!isVisible) return null;
	const { control, handleSubmit, getValues } = useForm<IPlaylistPayload>({
		mode: 'onSubmit',
	});
	const saveHandler = (e: MouseEvent<HTMLButtonElement>) => {
		handleSubmit(
			qw => {
				console.log('handleSubmit = ', qw);
				onSave(qw); //наверное он должен вызываться, когда успешная валидация
			},
			() => {
				console.log('inValid');
			},
		)();
	};

	return (
		<Modal
			style={{
				outline: 0,
			}}
			open={true}>
			<Grid container direction='column' className={styles.modal_grid}>
				<PlaylistHeader title='Создание нового плейлиста' onClose={onClose} />
				<PlaylistInfo control={control} />
				<PlaylistFooter title='Сохранить' onClick={saveHandler} />
			</Grid>
		</Modal>
	);
};
