import { StandardTextFieldProps, TextField } from '@mui/material';
import React, { FC } from 'react';
interface ICustomInputProps extends StandardTextFieldProps {}

export const CustomInput: FC<ICustomInputProps> = ({ ...props }) => {
	return <TextField {...props} className={`input ${props.className}`} />;
};
