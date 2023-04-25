import { Grid, Typography } from '@material-ui/core';
import {
	H1,
	IPlaylist,
	Intersect,
	useAction,
	useIntersect,
	usePlaylist,
	useTypedSelector,
} from '@shared';
import { useAppDispatch } from '@shared/store';
import React, { FC, useEffect, useRef, useState } from 'react';
import { PlaylistList, PlaylistModal } from '../../widgets';
import { PlaylistListSkeleton } from '@shared/ui/Skeletons';
interface IPlaylistPageProps {}

const pageSize = 8;
const PlaylistPage = () => {
	const { playlists, isAllPlaylistLoading } = useTypedSelector(
		i => i.playlists,
	);
	const { _playlist } = useAction();
	const { onIntersect } = useIntersect(_playlist.fetchAllPlaylists, pageSize);
	const [isFirstRequest, setIsFirstRequest] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(_playlist.fetchUserPlaylists()).finally(() => {
			setIsFirstRequest(false);
		});
	}, []);
	return (
		<>
			<H1>Список плейлистов</H1>
			{isFirstRequest ? (
				<PlaylistListSkeleton amount={10} />
			) : (
				<Intersect
					id='playlist_intersection'
					isFetching={isAllPlaylistLoading}
					onIntersect={onIntersect}>
					<PlaylistsPageList playlists={playlists} />
				</Intersect>
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
	const { close, isVisible, onSave, onUpload, control } = usePlaylist();
	return playlists.length === 0 ? (
		<Grid container justifyContent='center' alignItems='center'>
			<Typography variant='h5' align='center'>
				Список плейлистов пуст
			</Typography>
		</Grid>
	) : (
		<>
			<PlaylistList playlists={playlists} />
			<PlaylistModal
				control={control}
				isVisible={isVisible}
				handlers={{
					onClose: close,
					onUpload,
					onSave,
				}}
			/>
		</>
	);
};
