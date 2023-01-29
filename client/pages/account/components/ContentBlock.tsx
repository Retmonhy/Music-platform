import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AuthRoutes, H2, useTypedSelector } from '../../../shared';
import { setIsLoading } from '../../../store/ActionCreators/account';
import styles from '../styles/Profile.module.scss';
import { UpdateProfileForm } from './';
interface IContentBlockProps {}
export const ContentBlock: FC<IContentBlockProps> = () => {
	return (
		<Box className={styles.content}>
			<Box className={styles.contentWrapper}>
				<H2>Личные данные</H2>
				<UpdateProfileForm />
			</Box>
		</Box>
	);
};
