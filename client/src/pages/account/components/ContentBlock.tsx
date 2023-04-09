import { Box } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { H2 } from '@shared';
import styles from '../styles/Profile.module.scss';
interface IContentBlockProps {
	header: string;
	children: ReactNode;
}
export const ContentBlock: FC<IContentBlockProps> = ({ header, children }) => {
	return (
		<Box className={styles.content}>
			<Box className={styles.contentWrapper}>
				<H2>{header}</H2>
				{children}
			</Box>
		</Box>
	);
};
