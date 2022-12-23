import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ControlledInput, ILoginData } from '../../../shared';
import { useInput } from '../../../shared/hooks';

import styles from '../ui/styles/Auth.module.scss';
export interface ILoginForm {
	onSubmit: (data: ILoginData) => void;
}
export const LoginForm: React.FC<ILoginForm> = ({ onSubmit }) => {
	const { handleSubmit, control } = useForm({ mode: 'onSubmit' });
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
					name='password'
					label='Пароль'
					type='password'
				/>
			</Grid>
			<Box style={{ textAlign: 'right' }}>
				<Button
					className={styles.submitButton}
					type='submit'
					onClick={handleSubmit(onSubmit)}>
					Войти
				</Button>
			</Box>
		</>
	);
};
