import { Grid, TextField } from '@material-ui/core';
import React from 'react';
import { useInput } from '../hooks';
import MainLayout from '../layouts/MainLayout';

const Auth = () => {
	const name = useInput();
	const surname = useInput();
	const email = useInput();
	const password = useInput();
	return (
		<MainLayout>
			<h2>Авторизация</h2>
			<Grid container direction='column' style={{ padding: '20px' }}>
				<TextField {...name} label='Имя' />
				<TextField {...surname} label='Фамилия' />
				<TextField {...email} label='Электронная почта' />
				<TextField {...password} label='Пароль' />
			</Grid>
		</MainLayout>
	);
};
export default Auth;
