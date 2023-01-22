import { Box } from '@mui/material';
import React, { FC } from 'react';
import { H2, useTypedSelector } from '../../../shared';
import styles from '../styles/Profile.module.scss';
import { UpdateProfileForm } from './';
interface IContentBlockProps {}
export const ContentBlock: FC<IContentBlockProps> = () => {
	const { accessToken } = useTypedSelector(i => i.account);
	return (
		<Box className={styles.content}>
			<Box className={styles.contentWrapper}>
				<H2>Личные данные</H2>
				<UpdateProfileForm onSubmit={() => {}} />
			</Box>
		</Box>
	);
};
