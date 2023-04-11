import { AccountLayout, ContentBlock } from './components';
import React, {
	FC,
	ReactNode,
	createContext,
	useCallback,
	useEffect,
	useState,
} from 'react';
import {
	IPlaylist,
	Loader,
	PlaylistMode,
	PlaylistService,
	useAction,
	usePlaylist,
	useTypedSelector,
} from '@shared';
import { PlaylistItem } from './components';
import { Box, Button, Grid, Typography } from '@mui/material';
import { PlaylistModal } from '../../widgets';
import { NextThunkDispatch, useAppDispatch } from '@shared/store';
interface IPlaylistProps {}

const AccountPlaylistsPage: FC<IPlaylistProps> = () => {
	//hooks
	const { userPlaylists, isPlaylistLoading, playlistsToDelete } =
		useTypedSelector(i => i.playlists);
	const { _playlist } = useAction();
	const dispatch = useAppDispatch();
	const deletePlaylistsOnUnmount = useCallback(() => {
		if (playlistsToDelete.length)
			dispatch(_playlist.deletePlaylists(playlistsToDelete));
	}, [playlistsToDelete]);

	useEffect(() => {
		dispatch(_playlist.fetchPlaylists());
		return deletePlaylistsOnUnmount;
	}, []);

	const { open, close, isVisible, onSave, onUpload, control } = usePlaylist();
	return (
		<AccountLayout>
			<ContentBlock header='Мои плейлисты'>
				{isPlaylistLoading ? (
					<Loader />
				) : (
					<PlaylistList playlists={userPlaylists} />
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
export default AccountPlaylistsPage;

interface IPlaylistList {
	playlists: IPlaylist[];
}
export const PlaylistList: FC<IPlaylistList> = ({ playlists }) => {
	const { open } = usePlaylist();
	const createPlaylist = () => {
		open(PlaylistMode.Create);
	};
	return playlists.length === 0 ? (
		<Grid container flexDirection='column' alignItems='center'>
			<Box mb={1}>
				<Typography variant='h6'>Вы не добавили ни одного плейлиста</Typography>
			</Box>
			<Button variant='contained' onClick={createPlaylist}>
				Создать плейлист
			</Button>
		</Grid>
	) : (
		<Grid container flexDirection='row' flexWrap='wrap'>
			{playlists.map(playlist => (
				<PlaylistItem key={playlist.id} item={playlist} />
			))}
		</Grid>
	);
};
