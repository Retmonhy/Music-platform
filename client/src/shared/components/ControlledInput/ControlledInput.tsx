import { TextField, StandardTextFieldProps } from '@mui/material';
import React from 'react';
import { Controller, UseControllerProps } from 'react-hook-form';
import { CustomInput } from '../CustomInput';
interface ControlledInput<T> extends StandardTextFieldProps {
	controllerProps: UseControllerProps<T>;
	label: string;
}

export const ControlledInput = <T,>({
	controllerProps,
	label,
	...props
}: React.PropsWithChildren<ControlledInput<T>>) => {
	return (
		<Controller
			{...controllerProps}
			render={({ fieldState: { error }, field: { onChange, value } }) => {
				return (
					<CustomInput
						{...props}
						value={value || ''}
						onChange={onChange}
						className='input'
						label={label}
						error={error?.type === 'required'}
						helperText={error?.message}
					/>
				);
			}}
		/>
	);
};
