//@libraries
import React, { FC, HTMLAttributes, MouseEvent } from 'react';
//components
import { Grid } from '@mui/material';
//styles
import general from '../../styles/General.module.scss';
interface IMusicInfoProps extends HTMLAttributes<HTMLDivElement> {
	title: string;
	description: string;
	titleClick: (e: MouseEvent<HTMLSpanElement>) => void;
}

export const MusicInfo: FC<IMusicInfoProps> = ({
	title,
	description,
	titleClick,
	...props
}) => {
	return (
		<Grid {...props} container direction='column'>
			<div>
				<span onClick={titleClick} className={general.trackTitle}>
					{title}
				</span>
			</div>
			<div className={general.gray}>{description}</div>
		</Grid>
	);
};
