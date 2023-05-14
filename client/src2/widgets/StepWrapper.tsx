import {
	Card,
	Container,
	Grid,
	Step,
	StepLabel,
	Stepper,
} from '@material-ui/core';
import { Paper, Typography } from '@mui/material';
import { useIsMobile } from '@shared';

interface IStepWrapperProps {
	activeStep: number;
	children: React.ReactNode;
}

export const StepWrapper: React.FC<IStepWrapperProps> = ({
	activeStep,
	children,
}) => {
	const steps = ['Информация о треке', 'Загрузка обложки', 'Загрузка аудио'];
	const isMobile = useIsMobile();
	return (
		<div>
			{isMobile ? (
				<Paper square elevation={0} className='mobile-paper'>
					<Typography>{steps[activeStep]}</Typography>
				</Paper>
			) : (
				<Stepper activeStep={activeStep} className='stepper'>
					{steps.map((step, index) => {
						return (
							<Step key={index} completed={activeStep > index}>
								<StepLabel>{step}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
			)}
			<Grid container justifyContent='center' style={{ height: '270px' }}>
				<Card style={{ width: 600 }}>{children}</Card>
			</Grid>
		</div>
	);
};
