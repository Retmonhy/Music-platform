import { Button, Grid, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Endpoints, ICreateTrackResponse } from '../../api';
import { FileUpload, StepWrapper } from '../../components';
import { useInput } from '../../hooks';
import MainLayout from '../../layouts/MainLayout';
import { apiInstance } from '../_app';

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

		const { data } = await apiInstance.post<ICreateTrackResponse>(
			Endpoints.TRACKS,
			form,
		);
		if (data.isSuccess) {
			router.push('/tracks');
		}
	};

	return (
		<MainLayout>
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
						<FileUpload accept='image/*' setFile={file => setPicture(file[0])}>
							<Button>Загрузить файл</Button>
						</FileUpload>
					)}
					{activeStep === 2 && (
						<FileUpload accept='audio/*' setFile={file => setAudio(file[0])}>
							<Button>Загрузить файл</Button>
						</FileUpload>
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
		</MainLayout>
	);
};
export default Create;
