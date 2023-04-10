import { AccountLayout, ContentBlock } from './components';
import React, {
	FC,
	ReactNode,
	createContext,
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
import { Button, Grid } from '@mui/material';
import { PlaylistModal } from '../../widgets';
import { NextThunkDispatch, useAppDispatch } from '@shared/store';
interface IPlaylistProps {}

const AccountPlaylistsPage: FC<IPlaylistProps> = () => {
	//hooks
	const { userPlaylists, isPlaylistLoading } = useTypedSelector(
		i => i.playlists,
	);
	const { _playlist } = useAction();
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(_playlist.fetchPlaylists());
		return () => {};
	}, []);
	const { open, close, isVisible, onSave, onUpload, control } = usePlaylist();
	const createPlaylist = () => {
		open(PlaylistMode.Create);
	};
	const addPlaylist = () => {
		const promise = PlaylistService.addPlaylistToUser(
			'64340ba1292c5380ffd1097f',
		);
	};
	return (
		<AccountLayout>
			<ContentBlock header='Мои плейлисты'>
				<Button onClick={createPlaylist}>Создать плейлист</Button>
				<Button onClick={addPlaylist}>Добавить плейлист</Button>
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
	return (
		<Grid container flexDirection='row' flexWrap='wrap'>
			{playlists.map(playlist => (
				<PlaylistItem key={playlist.id} item={playlist} />
			))}
		</Grid>
	);
};
