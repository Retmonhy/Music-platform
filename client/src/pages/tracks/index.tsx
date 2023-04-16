import { Box, Card, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { TrackList } from './components';
import { useAction, usePlaylist } from '@shared';
import { PlaylistModal } from '../../widgets';
import { NextThunkDispatch, useAppDispatch, wrapper } from '@shared/store';

const Index: React.FC = () => {
	const { tracks, error } = useTypedSelector(st => st.track);
	const dispatch = useAppDispatch();
	const { _track } = useAction();
	useEffect(() => {
		dispatch(_track.fetchTracks());
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
					<TrackList tracks={tracks} />
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
