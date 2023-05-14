import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledInput, ILoginData, useTypedSelector } from '@shared';
import { Local } from '@shared/const/localization';

interface ILoginForm {
	onSubmit: (data: ILoginData) => void;
}
export const LoginForm: React.FC<ILoginForm> = ({ onSubmit }) => {
	//hooks
	const { handleSubmit, control } = useForm({
		mode: 'onSubmit',
		defaultValues: {
			email: 'retmonhy@gmail.com',
			password: 'Rektijd12',
		},
	});
	const submitBtn = useRef<HTMLButtonElement>(null);
	const { isLoading } = useTypedSelector(i => i.account);
	//functions
	const enterPressSubmit = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			submitBtn.current.click();
		}
	};
	useEffect(() => {
		document.addEventListener('keydown', enterPressSubmit);
		return () => document.removeEventListener('keydown', enterPressSubmit);
	}, []);
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
					onClick={handleSubmit(onSubmit)}>
					{Local.Account.LoginButton}
				</LoadingButton>
			</Box>
		</>
	);
};
