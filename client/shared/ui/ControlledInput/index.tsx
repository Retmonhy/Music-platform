import { TextField, StandardTextFieldProps } from '@mui/material';
import React from 'react';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import styles from './../../styles/General.module.scss';
interface ControlledInput extends StandardTextFieldProps {
	controllerProps: {
		control: Control;
		rules?: RegisterOptions;
	};
	name: string;
	label: string;
}

export const ControlledInput: React.FC<ControlledInput> = ({
	controllerProps,
	name,
	label,
	...props
}) => {
	return (
		<Controller
			name={name}
			{...controllerProps}
			render={({ fieldState: { error }, field: { onChange } }) => {
				return (
					<TextField
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
