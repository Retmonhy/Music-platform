//libraties
import React, { FC, useState, MouseEvent } from 'react';
import Image from 'next/image';
import { EditOutlined, PlayArrowRounded } from '@material-ui/icons';
//conponents

import { generateUrl, merge } from '../../../../shared';
//styles
import styles from './PlaylistImage.module.scss';
import general from '../../../../shared/styles/General.module.scss';
import { SquareDiv } from '../../../../shared/ui';
import { Box } from '@mui/material';

const imageSize = 70;
interface IPlaylistProps {
	source: string;
	alt: string;
	size: string | number;
	onPlay: () => void;
	onEdit: () => void;
}
export const PlaylistImage: FC<IPlaylistProps> = ({
	source,
	alt,
	size,
	onEdit,
	onPlay,
}) => {
	const [isHover, setHover] = useState<boolean>(false);
	const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setHover(true);
	};
	const onMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setHover(false);
	};
	return (
		<div className={general.relative}>
			<SquareDiv
				size={size}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}>
				<img
					src={generateUrl(source)}
					alt={alt}
					width={size}
					height={size}
					className={styles.br8}
				/>
			</SquareDiv>
			{true ? (
				<SquareDiv size={size} className={merge(general.backdrop, styles.br8)}>
					<Box className={styles.buttons}>
						<SquareDiv
							size={60}
							className={merge(styles.btn, styles.edit_btn)}
							onClick={onEdit}>
							<EditOutlined fontSize='inherit' color='inherit' />
						</SquareDiv>
						<SquareDiv
							size={60}
							className={merge(styles.btn, styles.play_btn)}
							onClick={onPlay}>
							<PlayArrowRounded fontSize='inherit' color='inherit' />
						</SquareDiv>
						<SquareDiv size={60} className={merge(styles.btn)}>
							{}
						</SquareDiv>
					</Box>
				</SquareDiv>
			) : null}
		</div>
	);
};
