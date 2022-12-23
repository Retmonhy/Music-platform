import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Card, Tab, Tabs, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import MainLayout from '../../layouts/MainLayout';
import { useTypedSelector } from '../../shared/hooks';
import { NextThunkDispatch } from '../../store';
import { login, registration } from '../../store/ActionCreators/account';
import { RegistrationForm } from './components/RegistrationForm';
import {
	ILoginData,
	IRegistrationData,
	RegistrationModes,
	TabPanelProps,
} from '../../shared';
import styles from './ui/styles/Auth.module.scss';
import { LoginForm } from './components/LoginForm';

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Box>{children}</Box>
				</Box>
			)}
		</div>
	);
}
const AuthPage = () => {
	const { isLoading } = useTypedSelector(i => i.account);
	const [mode, setMode] = useState<RegistrationModes>(RegistrationModes.REG);
	const router = useRouter();
	const dispatch = useDispatch() as NextThunkDispatch;
	const handleChange = (
		event: React.SyntheticEvent,
		newValue: RegistrationModes,
	) => {
		setMode(newValue);
	};
	const registrationSubmit = async (payload: IRegistrationData) => {
		const { email, password } = payload;
		const reg = await dispatch(await registration(payload));
		console.log('reg = ', reg);
		await dispatch(await login(email, password));
		// router.push('/account/profile');
	};
	const loginSubmit = async (payload: ILoginData) => {
		const { email, password } = payload;
		await dispatch(await login(email, password));
		router.push('/account/profile');
	};
	if (isLoading) {
		return <div>Загрузка...</div>;
	}
	return (
		<MainLayout>
			<Box maxWidth={600} margin='0 auto' pt={4}>
				<Typography variant='h1' fontSize={36} mb={2}>
					Представьтесь, пожалуйста
				</Typography>
				<Card>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs
							variant='fullWidth'
							value={mode}
							onChange={handleChange}
							aria-label='auth tabs'>
							<Tab
								className={styles.tab}
								label='Регистрация'
								value={RegistrationModes.REG}
							/>
							<Tab
								className={styles.tab}
								label='Логин'
								value={RegistrationModes.LOGIN}
							/>
						</Tabs>
						<TabPanel value={mode} index={RegistrationModes.REG}>
							<RegistrationForm onSubmit={registrationSubmit} />
						</TabPanel>
						<TabPanel value={mode} index={RegistrationModes.LOGIN}>
							<LoginForm onSubmit={loginSubmit} />
						</TabPanel>
					</Box>
				</Card>
			</Box>
		</MainLayout>
	);
};
export default AuthPage;
