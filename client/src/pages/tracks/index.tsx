import { Box, Card, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTypedSelector } from '../../shared/hooks/useTypedSelector';

import { TrackList } from './components';
import { useAction, usePlaylist } from '../../shared';
import { useDispatch } from 'react-redux';
import { MainLayout, PlaylistModal } from '../../widgets';
import { NextThunkDispatch, wrapper } from '../../shared/store';

const Index: React.FC = () => {
	const { tracks, error } = useTypedSelector(st => st.track);
	const dispatch = useDispatch() as NextThunkDispatch;
	const { fetchUserPlaylists } = useAction()._account;
	useEffect(() => {
		dispatch(fetchUserPlaylists());
	}, []);
	if (error) {
		return (
			<MainLayout>
				<h1>{error}</h1>
			</MainLayout>
		);
	}

	const playlist = usePlaylist();
	return (
		<MainLayout title={'Список треков - музыкальная площадка'}>
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
		</MainLayout>
	);
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
	store => async () => {
		const dispatch = store.dispatch as NextThunkDispatch;
		const { _track } = useAction();
		await dispatch(_track.fetchTracks());
		//добавлено чтобы не было ошибки TS
		return {
			props: {},
		};
	},
);
