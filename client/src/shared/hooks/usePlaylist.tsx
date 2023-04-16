import React, { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FileService, ICreatePlaylistResponse, PlaylistService } from '../api';
import { IPlaylistData, PlaylistMode, UploadActionType } from '../types';
import { useTypedSelector } from './useTypedSelector';
import { NextThunkDispatch, useAppDispatch } from '../store';
import { useAction } from './useAction';

export const usePlaylist = () => {
	//hooks
	const { info, isVisible, selectedTracks, mode } = useTypedSelector(
		i => i.playlistModal,
	);
	const { _playlist } = useAction();
	const { setCover, setVisible, setMode } = useAction()._playlist;

	const dispatch = useAppDispatch();
	const { control, handleSubmit, reset } = useForm<IPlaylistData>({
		mode: 'onSubmit',
	});

	//handlers
	const onInvalid = () => console.log('inValid');

	const saveHandler = useCallback(
		async (payload: IPlaylistData) => {
			const payloadData = {
				cover: info?.cover ?? null,
				tracks: selectedTracks.filter(i => i.isChecked).map(i => i.track._id),
				...payload,
			};
			let result: ICreatePlaylistResponse | null = null;
			if (mode === PlaylistMode.Create) {
				const { data } = await PlaylistService.createPlaylist(payloadData);
				result = data;
			}
			if (mode === PlaylistMode.Edit) {
				const { data } = await PlaylistService.updatePlaylist(
					info.id,
					payloadData,
				);
				result = data;
			}
			if (result.isSuccess) {
				dispatch(setVisible(false));
				dispatch(_playlist.fetchUserPlaylists());
			}
		},
		[mode, selectedTracks, info && info.cover],
	);
	const onSave = () => {
		handleSubmit(saveHandler, onInvalid)();
	};

	const close = () => {
		dispatch(setVisible(false));
		dispatch(setCover(null));
		reset();
	};

	const open = (mode: PlaylistMode) => {
		dispatch(setMode(mode));
		dispatch(setVisible(true));
	};

	const onUpload = async (file: File | null) => {
		if (!file) {
			dispatch(setCover(null));
		}
		if (file) {
			const { data } = await FileService.upload(
				UploadActionType.PlaylistCover,
				file,
			);
			dispatch(setCover(data.path));
		}
	};

	return {
		isVisible,
		control,
		open,
		close,
		onUpload,
		onSave,
	};
};
