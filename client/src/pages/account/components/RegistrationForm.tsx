import { Box, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledInput, IRegistrationData, useTypedSelector } from '@shared';
import { Local } from '@shared/helper/localization';
export interface IRegistrationForm {
	onSubmit: (data: IRegistrationData) => void;
}
export const RegistrationForm: React.FC<IRegistrationForm> = ({ onSubmit }) => {
	const submitBtn = useRef<HTMLButtonElement>(null);
	const { isLoading } = useTypedSelector(i => i.account);
	const enterPressSubmit = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			submitBtn.current.click();
		}
	};

	const submitForm = data => onSubmit(data);
	useEffect(() => {
		document.addEventListener('keydown', enterPressSubmit);
		return () => document.removeEventListener('keydown', enterPressSubmit);
	}, []);

	const { control, handleSubmit } = useForm({ mode: 'onSubmit' });
	const inputRules = {
		required: {
			value: true,
			message: 'Поле обязательно для заполнения',
		},
	};
	return (
		<>
			<Grid container direction='column'>
				<ControlledInput
					controllerProps={{
						control: control,
						rules: inputRules,
						name: 'email',
					}}
					label={Local.General.Email}
				/>
				<ControlledInput
					controllerProps={{
						control: control,
						rules: inputRules,
						name: 'firstname',
					}}
					label={Local.General.Name}
				/>
				<ControlledInput
					controllerProps={{
						control: control,
						rules: inputRules,
						name: 'surname',
					}}
					label={Local.General.Surname}
				/>
				<ControlledInput
					controllerProps={{
						control: control,
						rules: inputRules,
						name: 'password',
					}}
					label={Local.General.Password}
					type='password'
				/>
			</Grid>
			<Box style={{ textAlign: 'right' }}>
				<LoadingButton
					loading={isLoading}
					sx={{
						'& .MuiLoadingButton-loadingIndicator': { color: '#fff' },
					}}
					ref={submitBtn}
					className='btn'
					type='submit'
					onClick={handleSubmit(submitForm)}>
					{Local.Account.RegistrationButton}
				</LoadingButton>
			</Box>
		</>
	);
};
