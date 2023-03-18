import { AccountLayout, ContentBlock } from './components';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useAction, usePlaylist, useTypedSelector } from './../../shared';
import { PlaylistItem } from './components';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { PlaylistModal } from '../../widgets';
import { NextThunkDispatch } from '../../shared/store';
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
	const { user, userPlaylists } = useTypedSelector(i => i.account);
	const { _account } = useAction();
	const dispatch = useDispatch() as NextThunkDispatch;
	useEffect(() => {
		dispatch(_account.fetchUserPlaylists());
	}, []);
	const { open, close, isVisible, onSave, onUpload, cover, control } =
		usePlaylist(user);

	return (
		<AccountLayout>
			<ContentBlock header='Мои плейлисты'>
				<Button onClick={open}>Open modal</Button>
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
					onUpload,
					onSave,
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
