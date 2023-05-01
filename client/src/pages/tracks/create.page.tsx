import { Button, Grid, MobileStepper, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { TrackService } from '@shared/api';
import { StepWrapper } from '../../widgets/StepWrapper';
import { FileUpload } from '../../widgets/FileUpload';
import { ControlledInput, H1, useIsMobile } from '@shared';
import { useForm } from 'react-hook-form';
import {
	CloudUploadOutlined,
	KeyboardArrowLeft,
	KeyboardArrowRight,
} from '@material-ui/icons';
import { Local } from '@shared/helper/localization';

interface ITrackInfo {
	name: string;
	author: string;
	text: string;
}

const Create = () => {
	const router = useRouter();

	const [activeStep, setActiveStep] = useState<number>(0);
	const [picture, setPicture] = useState(null);
	const [audio, setAudio] = useState(null);

	const prev = () => setActiveStep(prev => (prev -= 1));
	const next = () => {
		return activeStep !== 2 ? setActiveStep(prev => (prev += 1)) : undefined;
	};
	const createTrack = async (submitData: ITrackInfo) => {
		const { name, author, text } = submitData;
		const form = new FormData();
		form.append('name', name);
		form.append('artist', author);
		form.append('text', text);
		form.append('picture', picture);
		form.append('audio', audio);
		const { data } = await TrackService.createTrack(form);
		if (data.isSuccess) {
			router.push('/tracks');
		}
	};
	const uploadPicture = file => setPicture(file[0]);
	const uploadAudio = file => setAudio(file[0]);

	// const uploadCover = async (images: File[]) => {
	// 	const { data } = await FileService.upload(
	// 		UploadActionType.TrackCover,
	// 		images[0],
	// 	);
	// 	if (data.path) setPicture(data.path);
	// };
	// const uploadTrack = async (tracks: File[]) => {
	// 	console.log('tracks = ', tracks[0]);
	// 	const { data } = await FileService.upload(
	// 		UploadActionType.TrackAudio,
	// 		tracks[0],
	// 	);
	// 	if (data.path) setAudio(data.path);
	// };

	const handleSendTrack = () => {
		handleSubmit(createTrack, () => console.log('create track error'))();
	};
	const { control, handleSubmit } = useForm<ITrackInfo>();
	return (
		<>
			<H1>{Local.CreateTrack.PageTitle}</H1>
			<StepWrapper activeStep={activeStep}>
				{activeStep === 0 && (
					<Grid container direction='column' style={{ padding: '8px' }}>
						<ControlledInput
							controllerProps={{
								control,
								name: 'name',
							}}
							label={Local.CreateTrack.TrackTitle}
						/>
						<ControlledInput
							controllerProps={{
								control,
								name: 'author',
							}}
							label={Local.CreateTrack.TrackAuthor}
						/>
						<ControlledInput
							controllerProps={{
								control,
								name: 'text',
							}}
							label={Local.CreateTrack.TrackText}
							multiline
							minRows={2}
						/>
					</Grid>
				)}
				{activeStep === 1 && (
					<>
						<Grid
							container
							direction='column'
							justifyContent='center'
							alignItems='center'
							className='upload-icon'>
							<CloudUploadOutlined fontSize='inherit' color='inherit' />
							{picture ? (
								<Typography>{Local.CreateTrack.CoverIsUploaded}</Typography>
							) : (
								<Button>
									<FileUpload
										accept='image/*'
										setFile={uploadPicture}
										style={{ height: '100%' }}>
										{Local.CreateTrack.UploadCover}
									</FileUpload>
								</Button>
							)}
						</Grid>
					</>
				)}
				{activeStep === 2 && (
					<>
						<Grid
							container
							direction='column'
							justifyContent='center'
							alignItems='center'
							className='upload-icon'>
							<CloudUploadOutlined fontSize='inherit' color='inherit' />
							{audio ? (
								<Typography>{Local.CreateTrack.AudioIsUploaded}</Typography>
							) : (
								<Button>
									<FileUpload
										accept='audio/*'
										setFile={uploadAudio}
										style={{ height: '100%' }}>
										{Local.CreateTrack.UploadAudio}
									</FileUpload>
								</Button>
							)}
						</Grid>
					</>
				)}
			</StepWrapper>
			{useIsMobile() ? (
				<MobileStepper
					variant='text'
					steps={3}
					position='static'
					activeStep={activeStep}
					className='mobile-stepper'
					backButton={
						<Button size='small' onClick={prev} disabled={activeStep === 0}>
							<KeyboardArrowLeft />
							{Local.CreateTrack.Prev}
						</Button>
					}
					nextButton={
						<Button
							size='small'
							onClick={activeStep === 2 ? handleSendTrack : next}>
							{activeStep === 2
								? Local.CreateTrack.UploadTrack
								: Local.CreateTrack.Next}
							<KeyboardArrowRight />
						</Button>
					}
				/>
			) : (
				<Grid container justifyContent='space-between'>
					<Button onClick={prev} disabled={activeStep === 0}>
						{Local.CreateTrack.Prev}
					</Button>
					<Button onClick={activeStep === 2 ? handleSendTrack : next}>
						{activeStep === 2
							? Local.CreateTrack.UploadTrack
							: Local.CreateTrack.Next}
					</Button>
				</Grid>
			)}
		</>
	);
};
export default Create;
