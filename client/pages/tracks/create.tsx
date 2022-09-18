import { Button, Grid, TextField } from '@material-ui/core';
import { useState } from 'react';
import { FileUpload, StepWrapper } from '../../components';
import MainLayout from '../../layouts/MainLayout';

const Create = () => {
	const [activeStep, setActiveStep] = useState<number>(0);
	const prev = () => {
		setActiveStep(prev => (prev -= 1));
	};
	const next = () => {
		if (activeStep !== 2) {
			setActiveStep(prev => (prev += 1));
		}
	};
	const [picture, setPicture] = useState(null);
	const [audio, setAudio] = useState(null);
	return (
		<MainLayout>
			<>
				<StepWrapper activeStep={activeStep}>
					{activeStep === 0 && (
						<Grid container direction='column' style={{ padding: '20px' }}>
							<TextField style={{ marginTop: '10px' }} label='Название трека' />
							<TextField style={{ marginTop: '10px' }} label='Автор трека' />
							<TextField
								style={{ marginTop: '10px' }}
								label='Текст песни'
								multiline
								minRows={2}
							/>
						</Grid>
					)}
					{activeStep === 1 && (
						<FileUpload accept='image/*' setFile={() => {}}>
							<Button>Загрузить файл</Button>
						</FileUpload>
					)}
					{activeStep === 2 && (
						<FileUpload accept='audio/*' setFile={() => {}}>
							<Button>Загрузить файл</Button>
						</FileUpload>
					)}
				</StepWrapper>
				<Grid container justifyContent='space-between'>
					<Button onClick={prev} disabled={activeStep === 0}>
						Назад
					</Button>
					<Button onClick={next}>Врепед</Button>
				</Grid>
			</>
		</MainLayout>
	);
};
export default Create;
