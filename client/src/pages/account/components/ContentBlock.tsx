import { Box } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { H2 } from '@shared';
interface IContentBlockProps {
	header: string;
	children: ReactNode;
}
export const ContentBlock: FC<IContentBlockProps> = ({ header, children }) => {
	return (
		<Box className='content'>
			<Box className='content__wrapper'>
				<H2>{header}</H2>
				{children}
			</Box>
		</Box>
	);
};
