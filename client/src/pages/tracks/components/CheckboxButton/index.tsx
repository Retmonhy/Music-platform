import React, { FC, MouseEvent, useState } from 'react';
import { ButtonEl } from '@shared/ui/ButtonEl';
import { ButtonProps } from '@mui/material';
import { DoneRounded } from '@mui/icons-material';
import general from '@shared/styles/General.module.scss';
interface ICheckboxButtonProps extends ButtonProps {
	title: string;
	isChecked: boolean;
	onClick: () => void;
}

export const CheckboxButton: FC<ICheckboxButtonProps> = ({
	title,
	onClick,
	isChecked,
	...props
}) => {
	const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		onClick();
	};
	return (
		<ButtonEl
			{...props}
			onClick={clickHandler}
			startIcon={
				<DoneRounded
					className={isChecked ? general.iconButton : general.iconChecked}
				/>
			}>
			{title}
		</ButtonEl>
	);
};
