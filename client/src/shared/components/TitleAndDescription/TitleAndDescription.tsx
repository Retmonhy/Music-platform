//@libraries
import React, { FC, HTMLAttributes, MouseEvent } from 'react';
//components
import { Grid } from '@mui/material';
interface ITitleAndDescriptionProps extends HTMLAttributes<HTMLDivElement> {
	title: string;
	description: string;
	titleClick: () => void;
}

export const TitleAndDescription: FC<ITitleAndDescriptionProps> = ({ title, description, titleClick, ...props }) => {
	const titleClickHandler = (event: MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		titleClick();
	};
	return (
		<Grid {...props} container direction='column'>
			<div>
				<span onClick={titleClickHandler} className='title' data-testid='musicinfo-title'>
					{title}
				</span>
			</div>
			<div className='gray subtitle' data-testid='musicinfo-subtitle'>
				{description}
			</div>
		</Grid>
	);
};
