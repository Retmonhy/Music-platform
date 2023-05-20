//@libraries
import React, { FC, HTMLAttributes, MouseEvent } from 'react';
//components
import { Grid } from '@mui/material';
interface IPlaylistInfoProps extends HTMLAttributes<HTMLDivElement> {
	title: string;
	description: string;
	titleClick: (e: MouseEvent<HTMLSpanElement>) => void;
}

export const PlaylistInfo: FC<IPlaylistInfoProps> = ({ title, description, titleClick, ...props }) => {
	return (
		<Grid {...props} container direction='column'>
			<div>
				<span onClick={titleClick} className='title' data-testid='musicinfo-title'>
					{title}
				</span>
			</div>
			<div className='gray subtitle' data-testid='musicinfo-subtitle'>
				{description}
			</div>
		</Grid>
	);
};
