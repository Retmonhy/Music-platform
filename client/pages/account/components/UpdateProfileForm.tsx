import { Box, Grid, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useEffect, useRef, MouseEvent } from 'react';
import { useForm } from 'react-hook-form';
import {
	ControlledInput,
	IRegistrationData,
	useAction,
	useTypedSelector,
} from '../../../shared';
import general from '../../../shared/styles/General.module.scss';
import vars from '../../../shared/styles/Variables.module.scss';
import { useDispatch } from 'react-redux';
import { NextThunkDispatch } from '../../../store';

type IUpdateProfileData = Omit<IRegistrationData, 'password'>;
export interface IUpdateProfileForm {
	onSubmit: (data: IUpdateProfileData) => void;
}

export const UpdateProfileForm: React.FC<IUpdateProfileForm> = ({
	onSubmit,
}) => {
	//hooks
	const dispatch = useDispatch() as NextThunkDispatch;
	const { user, accessToken } = useTypedSelector(i => i.account);
	const { logout, update } = useAction()._account;
	const submitBtn = useRef<HTMLButtonElement>(null);
	const { isLoading } = useTypedSelector(i => i.account);
	const { control, handleSubmit } = useForm<IUpdateProfileData>({
		mode: 'onSubmit',
		defaultValues: user && {
			email: user.email,
			firstname: user.firstname,
			surname: user.surname,
		},
	});
	//variables
	const inputRules = {
		required: {
			value: true,
			message: 'Поле обязательно для заполнения',
		},
	};
	//functions
	const enterPressSubmit = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			submitBtn.current.click();
		}
	};
	const submitForm = async data => {
		console.log('data = ', data);
		console.log('accessToken = ', accessToken);
		await dispatch(update(accessToken, data));
	};
	const logoutHandler = async (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		console.log('await logout() = ', await logout());
		// dispatch(await logout());
	};
	//useEffect
	useEffect(() => {
		document.addEventListener('keydown', enterPressSubmit);
		return () => document.removeEventListener('keydown', enterPressSubmit);
	}, []);
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
			</Grid>
			<Box
				style={{
					textAlign: 'right',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Link
					href='#'
					underline='always'
					color={vars.dangerColor}
					onClick={logoutHandler}>
					Выйти
				</Link>
				<LoadingButton
					loading={isLoading}
					sx={{
						'& .MuiLoadingButton-loadingIndicator': { color: '#fff' },
					}}
					ref={submitBtn}
					className={general.btn}
					type='submit'
					onClick={handleSubmit(submitForm)}>
					Сохранить
				</LoadingButton>
			</Box>
		</>
	);
};
