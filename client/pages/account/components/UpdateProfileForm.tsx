import { Box, Grid, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
	ControlledInput,
	IRegistrationData,
	useTypedSelector,
} from '../../../shared';
import general from '../../../shared/styles/General.module.scss';
import vars from '../../../shared/styles/Variables.module.scss';

type IUpdateProfileData = Omit<IRegistrationData, 'password'>;
export interface IUpdateProfileForm {
	onSubmit: (data: IUpdateProfileData) => void;
}

export const UpdateProfileForm: React.FC<IUpdateProfileForm> = ({
	onSubmit,
}) => {
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

	const { user } = useTypedSelector(i => i.account);
	const { control, handleSubmit } = useForm<IUpdateProfileData>({
		mode: 'onSubmit',
		defaultValues: user,
	});
	console.log('user = ', {
		email: user.email,
		firstname: user.firstname,
		surname: user.surname,
	});
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
			</Grid>
			<Box
				style={{
					textAlign: 'right',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Link href='#' underline='always' color={vars.dangerColor}>
					Удалить профиль
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
