import { Box, Card, Grid } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { TrackList } from './components';
import { H1, useAction, useIntersect, usePlaylist } from '@shared';
import { PlaylistModal } from '../../widgets';
import { useAppDispatch } from '@shared/store';
import { Intersect } from '@shared/ui';
import { TrackListSkeleton } from '@shared/ui/Skeletons';
import { Local } from '@shared/helper/localization';
const pageSize = 10;

const TrackPage: React.FC = () => {
	const { _track } = useAction();
	const { tracks, error, isLoading } = useTypedSelector(st => st.track);
	const { onIntersect } = useIntersect(_track.fetchTracks, pageSize);
	const dispatch = useAppDispatch();

	const [isFirstRequest, setIsFirstRequest] = useState<boolean>(true);
	useEffect(() => {
		dispatch(_track.fetchTracks({ pageSize, page: 0 })).finally(() => {
			setIsFirstRequest(false);
		});
	}, []);
	const playlist = usePlaylist();
	return (
		<>
			<Grid container justifyContent='center'>
				<Card style={{ width: '900px' }}>
					<Box p={3}>
						<Grid container justifyContent='space-between'>
							<H1>{Local.Tracks.PageTitle}</H1>
						</Grid>
					</Box>
					{error ? <H1>{error}</H1> : null}
					{isFirstRequest ? (
						<TrackListSkeleton amount={10} />
					) : (
						<Intersect
							onIntersect={onIntersect}
							id='track_intersection'
							isFetching={isLoading}>
							<TrackList tracks={tracks} />
						</Intersect>
					)}
				</Card>
			</Grid>
			<PlaylistModal
				isVisible={playlist.isVisible}
				control={playlist.control}
				handlers={{
					onClose: playlist.close,
					onSave: playlist.onSave,
					onUpload: playlist.onUpload,
				}}
			/>
		</>
	);
};

export default TrackPage;

// export const getServerSideProps = wrapper.getServerSideProps(
// 	store => async () => {
// 		const dispatch = store.dispatch as NextThunkDispatch;
// 		const { _track } = useAction();
// 		dispatch(_track.fetchTracks());
// 		//добавлено чтобы не было ошибки TS
// 		return {
// 			props: {},
// 		};
// 	},
// );
