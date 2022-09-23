import { Box, Button, Card, Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { TrackList } from '../../components';
import { useAction } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks } from '../../store/ActionCreators/track';
import { ITrack, TrackActionTypes } from '../../types/track';

const Index: React.FC = () => {
	const router = useRouter();
	const { tracks, error } = useTypedSelector(st => st.track);
	if (error) {
		return (
			<MainLayout>
				<h1>{error}</h1>
			</MainLayout>
		);
	}
	return (
		<MainLayout>
			<Grid container justifyContent='center'>
				<Card style={{ width: '900px' }}>
					<Box p={3}>
						<Grid container justifyContent='space-between'>
							<h1>Список треков</h1>
							<Button onClick={() => router.push('/tracks/create')}>
								Загрузить
							</Button>
						</Grid>
					</Box>
					<TrackList tracks={tracks} />
				</Card>
			</Grid>
		</MainLayout>
	);
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
	store =>
		async ({}) => {
			const dispatch = store.dispatch as NextThunkDispatch;
			await dispatch(await fetchTracks());
			// dispatch({
			// 	type: TrackActionTypes.FETCH_TRACKS_ERROR,
			// 	payload: 'qwqw',
			// });
		},
);
