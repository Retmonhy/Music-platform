import { AccountLayout, ContentBlock } from './components';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import {
	Loader,
	PlaylistMode,
	useAction,
	usePlaylist,
	useTypedSelector,
} from './../../shared';
import { PlaylistItem } from './components';
import { Button, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { PlaylistModal } from '../../widgets';
import { NextThunkDispatch } from '../../shared/store';
interface IPlaylistProps {}

const Playlist: FC<IPlaylistProps> = () => {
	//hooks
	const { userPlaylists, isPlaylistLoading } = useTypedSelector(i => i.account);
	const { _account } = useAction();
	const dispatch = useDispatch() as NextThunkDispatch;
	useEffect(() => {
		dispatch(_account.fetchUserPlaylists());
	}, []);
	const { open, close, isVisible, onSave, onUpload, control } = usePlaylist();
	const createPlaylist = () => {
		open(PlaylistMode.Create);
	};
	return (
		<AccountLayout>
			<ContentBlock header='Мои плейлисты'>
				<Button onClick={createPlaylist}>Создать плейлист</Button>
				{isPlaylistLoading ? (
					<Loader />
				) : (
					<PlaylistWrapper>
						{userPlaylists.map(playlist => (
							<PlaylistItem key={playlist.id} item={playlist} />
						))}
					</PlaylistWrapper>
				)}
			</ContentBlock>
			<PlaylistModal
				control={control}
				isVisible={isVisible}
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
	return (
		<Grid container flexDirection='row' flexWrap='wrap'>
			{children}
		</Grid>
	);
};
