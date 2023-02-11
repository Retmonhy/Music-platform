import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledInput, ILoginData, useTypedSelector } from '../../../shared';
import general from '../../../shared/styles/General.module.scss';

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
					label='Электронна почта'
				/>
				<ControlledInput
					controllerProps={{
						control: control,
						rules: inputRules,
						name: 'password',
					}}
					label='Пароль'
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
					className={general.btn}
					type='submit'
					onClick={handleSubmit(onSubmit)}>
					Войти
				</LoadingButton>
			</Box>
		</>
	);
};
