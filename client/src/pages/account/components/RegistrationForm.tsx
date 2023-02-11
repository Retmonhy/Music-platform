import { Box, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
	ControlledInput,
	IRegistrationData,
	useTypedSelector,
} from '../../../shared';
import general from '../../../shared/styles/General.module.scss';
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
					label='Электронная почта'
				/>
				<ControlledInput
					controllerProps={{
						control: control,
						rules: inputRules,
						name: 'firstname',
					}}
					label='Имя'
				/>
				<ControlledInput
					controllerProps={{
						control: control,
						rules: inputRules,
						name: 'surname',
					}}
					label='Фамилия'
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
					onClick={handleSubmit(submitForm)}>
					Зарегистрироваться
				</LoadingButton>
			</Box>
		</>
	);
};
