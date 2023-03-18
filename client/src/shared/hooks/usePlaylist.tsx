import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FileService, PlaylistService } from '../api';
import { IPlaylistPayload, IUser, UploadActionType } from '../types';

export const usePlaylist = (user: IUser) => {
	const [isVisible, setVisible] = useState<boolean>(false);
	const [cover, setCover] = useState<string | null>(null);
	const { control, handleSubmit, reset } = useForm<IPlaylistPayload>({
		mode: 'onSubmit',
	});
	const onInvalid = () => console.log('inValid');
	const createHandler = async (payload: IPlaylistPayload) => {
		const payloadData = { owner_id: user.id, cover, ...payload };
		const { data } = await PlaylistService.createPlaylist(payloadData);
		if (data.isSuccess) {
			setVisible(false);
		}
	};

	const close = () => {
		setVisible(false);
		setCover(null);
		reset();
	};
	const open = () => {
		setVisible(true);
	};

	const onUpload = async (file: File | null) => {
		if (!file) {
			setCover(null);
		}
		if (file) {
			const form = new FormData();
			form.append('file', file);
			const { data } = await FileService.upload(
				UploadActionType.PlaylistCover,
				form,
			);
			setCover(data.path);
		}
	};
	const onSave = () => {
		handleSubmit(createHandler, onInvalid)();
	};
	return {
		isVisible,
		open,
		close,
		onUpload,
		onSave,
		control,
		cover,
	};
};
