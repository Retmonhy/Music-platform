import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
	TrackEndpoints,
	ICreateTrackResponse,
	api,
	FileService,
	TrackService,
} from '@shared/api';
import { useInput } from '@shared/hooks';
import { MainLayout } from '../../widgets';
import { StepWrapper } from '../../widgets/StepWrapper';
import { FileUpload } from '../../widgets/FileUpload';
import { UploadActionType } from '@shared';

const Create = () => {
	const router = useRouter();

	const name = useInput();
	const artist = useInput();
	const text = useInput();

	const [activeStep, setActiveStep] = useState<number>(0);
	const [picture, setPicture] = useState(null);
	const [audio, setAudio] = useState(null);

	const prev = () => setActiveStep(prev => (prev -= 1));
	const next = () => {
		return activeStep !== 2 ? setActiveStep(prev => (prev += 1)) : undefined;
	};
	const sendTrack = async () => {
		const form = new FormData();
		form.append('name', name.value);
		form.append('artist', artist.value);
		form.append('text', text.value);
		form.append('picture', picture);
		form.append('audio', audio);
		const { data } = await TrackService.createTrack(form);
		if (data.isSuccess) {
			router.push('/tracks');
		}
	};
	const uploadCover = async (images: File[]) => {
		const { data } = await FileService.upload(
			UploadActionType.TrackCover,
			images[0],
		);
		if (data.path) setPicture(data.path);
	};
	const uploadTrack = async (tracks: File[]) => {
		console.log('tracks = ', tracks[0]);
		const { data } = await FileService.upload(
			UploadActionType.TrackAudio,
			tracks[0],
		);
		if (data.path) setAudio(data.path);
	};

	return (
		<>
			<StepWrapper activeStep={activeStep}>
				{activeStep === 0 && (
					<Grid container direction='column' style={{ padding: '20px' }}>
						<TextField
							{...name}
							style={{ marginTop: '10px' }}
							label='Название трека'
						/>
						<TextField
							{...artist}
							style={{ marginTop: '10px' }}
							label='Автор трека'
						/>
						<TextField
							{...text}
							style={{ marginTop: '10px' }}
							label='Текст песни'
							multiline
							minRows={2}
						/>
					</Grid>
				)}
				{activeStep === 1 && (
					<>
						<FileUpload accept='image/*' setFile={file => setPicture(file[0])}>
							<Button>Загрузить обложку</Button>
						</FileUpload>
						<Typography>{picture ? 'Обложка загружена' : ''}</Typography>
					</>
				)}
				{activeStep === 2 && (
					<>
						<FileUpload accept='audio/*' setFile={file => setAudio(file[0])}>
							<Button>Загрузить аудиодорожку</Button>
						</FileUpload>
						<Typography>{audio ? 'Аудиодорожка загружена' : ''}</Typography>
					</>
				)}
			</StepWrapper>
			<Grid container justifyContent='space-between'>
				<Button onClick={prev} disabled={activeStep === 0}>
					Назад
				</Button>
				<Button onClick={activeStep === 2 ? sendTrack : next}>
					{activeStep === 2 ? 'Загрузить' : 'Врепед'}
				</Button>
			</Grid>
		</>
	);
};
export default Create;
