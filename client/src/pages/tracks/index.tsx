import { Box, Card, Grid } from '@material-ui/core';
import React, { useCallback, useRef } from 'react';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { TrackList } from './components';
import { H1, useAction, useIntersect, usePlaylist } from '@shared';
import { PlaylistModal } from '../../widgets';
import { useAppDispatch } from '@shared/store';
import { Intersect } from '@shared/ui';
const pageSize = 10;
const Index: React.FC = () => {
	const { _track } = useAction();
	const { tracks, error, isLoading } = useTypedSelector(st => st.track);
	const { onIntersect } = useIntersect(_track.fetchTracks, pageSize);

	const playlist = usePlaylist();
	return (
		<>
			<Grid container justifyContent='center'>
				<Card style={{ width: '900px' }}>
					<Box p={3}>
						<Grid container justifyContent='space-between'>
							<H1>Список треков</H1>
						</Grid>
					</Box>
					{error ? <H1>{error}</H1> : null}
					<Intersect
						onIntersect={onIntersect}
						id='track_intersection'
						isFetching={isLoading}>
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
