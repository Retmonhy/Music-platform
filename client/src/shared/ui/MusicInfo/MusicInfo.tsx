//@libraries
import React, { FC, HTMLAttributes, MouseEvent } from 'react';
//components
import { Grid } from '@mui/material';
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
				<span onClick={titleClick} className='title'>
					{title}
				</span>
			</div>
			<div className='gray subtitle'>{description}</div>
		</Grid>
	);
};
