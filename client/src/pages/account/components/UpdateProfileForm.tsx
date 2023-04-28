import { Box, Grid, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useEffect, useRef, MouseEvent } from 'react';
import { useForm } from 'react-hook-form';
import {
	AccountRoutes,
	ControlledInput,
	IRegistrationData,
	useAction,
	useTypedSelector,
	Toast,
} from '@shared';
import vars from '@shared/styles/Variables.module.scss';

import { useRouter } from 'next/router';
import { useAppDispatch } from '@shared/store';
import { Local } from '@shared/helper/localization';

type IUpdateProfileData = Omit<IRegistrationData, 'password'>;
export interface IUpdateProfileForm {}

const inputRules = {
	required: {
		value: true,
		message: 'Поле обязательно для заполнения',
	},
};

export const UpdateProfileForm: React.FC<IUpdateProfileForm> = () => {
	//hooks
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { user, accessToken, isLoading } = useTypedSelector(i => i.account);
	const { logout, update } = useAction()._account;
	const submitBtn = useRef<HTMLButtonElement>(null);
	const { control, handleSubmit } = useForm<IUpdateProfileData>({
		mode: 'onSubmit',
		defaultValues: user && {
			email: user.email,
			firstname: user.firstname,
			surname: user.surname,
		},
	});

	//functions
	const enterPressSubmit = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			submitBtn.current.click();
		}
	};
	const submitForm = payload => {
		if (!control._getDirty()) return;
		dispatch(update({ accessToken, payload }))
			.unwrap()
			.catch(error => {
				new Toast({
					type: 'error',
					message: error.message,
				});
			});
	};
	const logoutHandler = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		dispatch(logout()).then(_ => router.replace(AccountRoutes.Login));
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
					{Local.Account.SignOut}
				</Link>
				<LoadingButton
					loading={isLoading}
					sx={{
						'& .MuiLoadingButton-loadingIndicator': { color: '#fff' },
					}}
					ref={submitBtn}
					className='btn'
					type='submit'
					onClick={handleSubmit(submitForm)}>
					{Local.General.Save}
				</LoadingButton>
			</Box>
		</>
	);
};
