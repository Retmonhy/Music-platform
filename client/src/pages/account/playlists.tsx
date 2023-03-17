import { AccountLayout, ContentBlock } from './components';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import {
	FileService,
	H2,
	UploadActionType,
	useAction,
	useTypedSelector,
} from './../../shared';
import { PlaylistItem } from './components';
import { Box, Button } from '@mui/material';
import { PlaylistModal } from '../tracks/components';
import { PlaylistService } from '../../shared/api/services/PlaylistService';
import { IPlaylistPayload } from '../../types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NextThunkDispatch } from '../../store';
interface IPlaylistProps {}

const data = [
	{
		name: 'Попса / Реп',
		description: 'description',
		id: 'string',
		owner_id: 'Dima Kuleshov',
		numberOfTracks: 124,
		lastUpdate: Date.now(),
		cover: '/image/9fad3e6e-c8c5-48cc-8c0a-f5a53275b360.jpg',
	},
	{
		name: 'Кей поп музыка',
		description: 'description',
		id: 'string1',
		owner_id: 'Dima Kuleshov',
		numberOfTracks: 102,
		lastUpdate: Date.now(),
		cover: '/image/9fad3e6e-c8c5-48cc-8c0a-f5a53275b360.jpg',
	},
	{
		name: 'Русский рок',
		description: 'description',
		id: 'string2',
		owner_id: 'Dima Kuleshov',
		numberOfTracks: 12,
		lastUpdate: Date.now(),
		cover: '/image/9fad3e6e-c8c5-48cc-8c0a-f5a53275b360.jpg',
	},
];

const Playlist: FC<IPlaylistProps> = () => {
	//hooks
	const [isVisible, setVisible] = useState<boolean>(false);
	const [cover, setCover] = useState<string | null>(null);
	const { user, userPlaylists } = useTypedSelector(i => i.account);
	const { _account } = useAction();
	const { control, handleSubmit, reset } = useForm<IPlaylistPayload>({
		mode: 'onSubmit',
	});
	const dispatch = useDispatch() as NextThunkDispatch;
	useEffect(() => {
		dispatch(_account.fetchUserPlaylists());
	}, []);

	//handlers
	const onInvalid = () => console.log('inValid');
	const createPlaylistHandler = async (payload: IPlaylistPayload) => {
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

	const uploadFile = async (file: File | null) => {
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
	const saveHandler = () => {
		console.log('saveHandler');
		handleSubmit(createPlaylistHandler, onInvalid)();
	};

	return (
		<AccountLayout>
			<ContentBlock header='Мои плейлисты'>
				<Button onClick={() => setVisible(true)}>Open modal</Button>
				<PlaylistWrapper>
					{userPlaylists.map(playlist => (
						<PlaylistItem key={playlist.id} item={playlist} />
					))}
				</PlaylistWrapper>
			</ContentBlock>
			<PlaylistModal
				control={control}
				isVisible={isVisible}
				cover={cover}
				handlers={{
					onClose: close,
					onUpload: uploadFile,
					onSave: saveHandler,
				}}
			/>
		</AccountLayout>
	);
};
export default Playlist;

interface IPlaylistWrapper {
	children: ReactNode;
}
const PlaylistWrapper: FC<IPlaylistWrapper> = ({ children }) => {
	return <Box style={{ padding: '20px', display: 'flex' }}>{children}</Box>;
};
