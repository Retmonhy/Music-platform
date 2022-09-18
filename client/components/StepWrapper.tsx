import {
	Card,
	Container,
	Grid,
	Step,
	StepLabel,
	Stepper,
} from '@material-ui/core';

interface IStepWrapperProps {
	activeStep: number;
	children: React.ReactNode;
}

export const StepWrapper: React.FC<IStepWrapperProps> = ({
	activeStep,
	children,
}) => {
	const steps = ['Информация о треке', 'Загрузка обложки', 'Загрузка аудио'];
	return (
		<div>
			<Container>
				<Stepper activeStep={activeStep}>
					{steps.map((step, index) => {
						return (
							<Step key={index} completed={activeStep > index}>
								<StepLabel>{step}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				<Grid
					container
					justifyContent='center'
					style={{ margin: '70px 0', height: '270px' }}>
					<Card style={{ width: 600 }}>{children}</Card>
				</Grid>
			</Container>
		</div>
	);
};
