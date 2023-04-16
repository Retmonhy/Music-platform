import { Grid, Typography } from '@material-ui/core';
import { H1, IPlaylist, Loader, useAction, useTypedSelector } from '@shared';
import store, { useAppDispatch } from '@shared/store';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PlaylistList } from 'src/widgets';
interface IPlaylistPageProps {}

const PlaylistPage = () => {
	const { playlists, isAllPlaylistLoading } = useTypedSelector(
		i => i.playlists,
	);
	const dispatch = useAppDispatch();
	const { _playlist } = useAction();
	useEffect(() => {
		dispatch(_playlist.fetchAllPlaylists());
	}, []);

	return (
		<>
			<H1>Список плейлистов</H1>
			{isAllPlaylistLoading ? (
				<Loader />
			) : (
				<PlaylistsPageList playlists={playlists} />
			)}
		</>
	);
};
export default PlaylistPage;

interface IPlaylistsPageListProps {
	playlists: IPlaylist[];
}

export const PlaylistsPageList: FC<IPlaylistsPageListProps> = ({
	playlists,
}) => {
	return playlists.length === 0 ? (
		<Grid container justifyContent='center' alignItems='center'>
			<Typography variant='h5' align='center'>
				Список плейлистов пуст
			</Typography>
		</Grid>
	) : (
		<PlaylistList playlists={playlists} />
	);
};
