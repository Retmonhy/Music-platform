import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledInput, IRegistrationData } from '../../../shared';
import styles from '../ui/styles/Auth.module.scss';
export interface IRegistrationForm {
	onSubmit: (data: IRegistrationData) => void;
}
export const RegistrationForm: React.FC<IRegistrationForm> = ({ onSubmit }) => {
	const submitBtm = useRef<HTMLButtonElement>(null);
	const enterPressSubmit = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			//через ref кликать неа кнопку
			submitBtm.current.click();
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
					}}
					name='email'
					label='Электронна почта'
				/>
				<ControlledInput
					controllerProps={{
						control: control,
						rules: inputRules,
					}}
					name='name'
					label='Имя'
				/>
				<ControlledInput
					controllerProps={{
						control: control,
						rules: inputRules,
					}}
					name='surname'
					label='Фамилия'
				/>
				<ControlledInput
					controllerProps={{
						control: control,
						rules: inputRules,
					}}
					name='password'
					label='Пароль'
					type='password'
				/>
			</Grid>
			<Box style={{ textAlign: 'right' }}>
				<Button
					ref={submitBtm}
					className={styles.submitButton}
					type='submit'
					onClick={handleSubmit(submitForm)}>
					Зарегистрироваться
				</Button>
			</Box>
		</>
	);
};
