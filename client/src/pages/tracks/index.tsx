import { Box, Card, Grid } from '@material-ui/core';
import React, { useCallback, useRef } from 'react';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { TrackList } from './components';
import { ITrack, useAction, usePlaylist } from '@shared';
import { PlaylistModal } from '../../widgets';
import { useAppDispatch } from '@shared/store';
import { Intersect } from '@shared/ui';
const pageSize = 10;
const Index: React.FC = () => {
	const { tracks, error } = useTypedSelector(st => st.track);
	const dispatch = useAppDispatch();
	const { _track } = useAction();
	const pageRef = useRef<number>(0);
	const stopRequesting = useRef<boolean>(false);

	const onIntersect = useCallback(() => {
		if (!stopRequesting.current) {
			let result = dispatch(
				_track.fetchTracks({ page: pageRef.current, pageSize: pageSize }),
			);
			result.then(res => {
				pageRef.current += 1;
				if (res.payload.length < pageSize) {
					stopRequesting.current = true;
				}
			});
		}
	}, []);
	if (error) {
		return <h1>{error}</h1>;
	}

	const playlist = usePlaylist();
	return (
		<>
			<Grid container justifyContent='center'>
				<Card style={{ width: '900px' }}>
					<Box p={3}>
						<Grid container justifyContent='space-between'>
							<h1>Список треков</h1>
						</Grid>
					</Box>
					<Intersect onIntersect={onIntersect} id='track_intersection'>
						<TrackList tracks={tracks} />
					</Intersect>
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

export default Index;

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
