import { Box, Button, Card, Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { TrackList } from '../../components';
import { useAction } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';

const Index: React.FC = () => {
	const router = useRouter();
	const tracks: ITrack[] = [
		{
			_id: 'ae233d68-a923-4eb3-a0e3-524975422b69',
			name: 'BestTrack',
			artist: 'Alyosha',
			text: 'Description',
			listens: 5,
			audio: 'ae233d68-a923-4eb3-a0e3-524975422b69.mp3',
			picture: '36ac72ba-0c4d-4063-8bcb-7398b28d682c.jpg',
			comments: [],
		},
		{
			_id: 'ae233d68-a923-4eb3-a0e3-524975422b68',
			name: 'BestTrack 1',
			artist: 'Alyosha 1',
			text: 'Description 1',
			listens: 1,
			audio: 'ae233d68-a923-4eb3-a0e3-524975422b68.mp3',
			picture: '36ac72ba-0c4d-4063-8bcb-7398b28d682b.jpg',
			comments: [],
		},
		{
			_id: 'ae233d68-a923-4eb3-a0e3-524975422b67',
			name: 'BestTrack 2',
			artist: 'Alyosha 2',
			text: 'Description 2',
			listens: 2,
			audio: 'ae233d68-a923-4eb3-a0e3-524975422b67.mp3',
			picture: '36ac72ba-0c4d-4063-8bcb-7398b28d682a.jpg',
			comments: [],
		},
	];
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
