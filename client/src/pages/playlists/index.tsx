import { Grid, Typography } from '@material-ui/core';
import {
	H1,
	IPlaylist,
	Intersect,
	useAction,
	useIntersect,
	useTypedSelector,
} from '@shared';
import { useAppDispatch } from '@shared/store';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { PlaylistList } from '../../widgets';
interface IPlaylistPageProps {}

const pageSize = 8;
const PlaylistPage = () => {
	const { playlists, isAllPlaylistLoading } = useTypedSelector(
		i => i.playlists,
	);
	const dispatch = useAppDispatch();
	const { _playlist } = useAction();
	useEffect(() => {
		dispatch(_playlist.fetchAllPlaylists());
	}, []);
	const { onIntersect } = useIntersect(_playlist.fetchAllPlaylists, pageSize);
	return (
		<>
			<H1>Список плейлистов</H1>
			<Intersect
				id='playlist_intersection'
				isFetching={isAllPlaylistLoading}
				onIntersect={onIntersect}>
				<PlaylistsPageList playlists={playlists} />
			</Intersect>
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
