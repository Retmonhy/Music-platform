// libraries
import React, { FC, useState } from 'react';
import { Box, Grid, Icon, IconButton, Typography } from '@mui/material';
import { AddRounded, CloseRounded } from '@material-ui/icons';
//hooks
// components
import { FileUpload, SquareDiv } from '../../../../components';
//styles
import styles from './Uploader.module.scss';
import general from '../../../../shared/styles/General.module.scss';
import { IFile, merge } from '../../../../shared';
import { Hidden } from '@material-ui/core';
import { IPlaylistPayload } from '../../model';
import { Control, Controller } from 'react-hook-form';

interface IUploaderProps {
	control: Control<IPlaylistPayload>;
}
const typoTheme = {
	'&.MuiTypography-body1': { fontSize: 13 },
};
export const Uploader: FC<IUploaderProps> = ({ control }) => {
	const [isShowed, setShowed] = useState<boolean>(false);
	const [file, setFile] = useState<IFile | null>(null);
	const showRemoveBtn = () => setShowed(true);
	const hideRemoveBtn = () => setShowed(false);
	const resetFile = () => setFile(null);
	return (
		<Box paddingRight={4}>
			{file ? (
				<Box className={merge(styles.uploader_wrap, general.relative)}>
					<SquareDiv
						onMouseEnter={showRemoveBtn}
						onMouseLeave={hideRemoveBtn}
						size={80}
						style={{
							background:
								'center / contain url(https://s0.rbk.ru/v6_top_pics/media/img/9/16/756619467602169.jpg)',
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
				<Controller
					name='file'
					control={control}
					render={({ field: { onChange, value } }) => {
						console.log('value = ', value);
						const changeEvent = e => {
							onChange(e[0]);
							setFile(e[0]);
						};
						return (
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
						);
					}}
				/>
			)}
		</Box>
	);
};
