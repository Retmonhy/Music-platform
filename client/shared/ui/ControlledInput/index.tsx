import { TextField, StandardTextFieldProps } from '@mui/material';
import React from 'react';
import { Controller, UseControllerProps } from 'react-hook-form';
import { IUser } from '../../../types';
import styles from './../../styles/General.module.scss';
interface ControlledInput<T> extends StandardTextFieldProps {
	controllerProps: UseControllerProps<T>;
	label: string;
}

export const ControlledInput = <T,>({
	controllerProps,
	label,
	...props
}: React.PropsWithChildren<ControlledInput<T>>) => {
	console.log('controllerProps = ', controllerProps);
	return (
		<Controller
			{...controllerProps}
			render={({ fieldState: { error }, field: { onChange, value } }) => {
				return (
					<TextField
						value={value || ''}
						onChange={onChange}
						label={label}
						className={styles.input}
						error={error?.type === 'required'}
						helperText={error?.message}
						{...props}
					/>
				);
			}}
		/>
	);
};
