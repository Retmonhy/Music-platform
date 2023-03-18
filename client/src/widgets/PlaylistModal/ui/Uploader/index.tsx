// libraries
import React, { FC, useState } from 'react';
import { Box, Grid, Icon, IconButton, Typography } from '@mui/material';
import { AddRounded, CloseRounded } from '@material-ui/icons';
//hooks
// components
//styles
import styles from './Uploader.module.scss';
import general from '../../../../shared/styles/General.module.scss';
import { Loader, SquareDiv, generateUrl, merge } from '../../../../shared';
import { FileUpload } from '../../../FileUpload';

interface IUploaderProps {
	onUpload: (file: File) => Promise<void>;
	cover: string;
}
const typoTheme = {
	'&.MuiTypography-body1': { fontSize: 13 },
};
export const Uploader: FC<IUploaderProps> = ({ cover, onUpload }) => {
	const [isShowed, setShowed] = useState<boolean>(false);
	const showRemoveBtn = () => setShowed(true);
	const hideRemoveBtn = () => setShowed(false);
	const resetFile = () => onUpload(null);
	const [isUploading, setUploading] = useState<boolean>(false);
	const uploadFile = (file: File) => {
		setUploading(() => true);
		onUpload(file);
		setUploading(() => false);
	};
	const changeEvent = (e: File[]) => {
		uploadFile(e[0]);
	};
	return isUploading ? (
		<Box paddingRight={4}>
			<SquareDiv size={80}>
				<Loader />
			</SquareDiv>
		</Box>
	) : (
		<Box paddingRight={4}>
			{cover ? (
				<Box className={merge(styles.uploader_wrap, general.relative)}>
					<SquareDiv
						onMouseEnter={showRemoveBtn}
						onMouseLeave={hideRemoveBtn}
						size={80}
						style={{
							background: `center / contain url(${generateUrl(cover)})`,
						}}>
						{isShowed ? (
							<Icon
								aria-label='remove'
								className={merge(styles.pointer, styles.uploader_remove)}
								onClick={resetFile}
								fontSize='small'>
								<CloseRounded viewBox='0 0 30 30' />
							</Icon>
						) : null}
					</SquareDiv>
				</Box>
			) : (
				<FileUpload accept='image/*' setFile={changeEvent}>
					<Box className={merge(styles.uploader_wrap, styles.pointer)}>
						<SquareDiv size={80}>
							<Grid container className={styles.uploader_grid}>
								<AddRounded className={styles.uploader_plus} />
								<Typography
									component='span'
									sx={typoTheme}
									className={styles.uploader_text}>
									Обложка
								</Typography>
							</Grid>
						</SquareDiv>
					</Box>
				</FileUpload>
			)}
		</Box>
	);
};
