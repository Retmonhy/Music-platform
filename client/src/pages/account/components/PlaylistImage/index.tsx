//libraties
import React, { FC } from 'react';
import Image from 'next/image';
import { PlayArrowRounded } from '@material-ui/icons';
//conponents

import { generateUrl, merge } from '../../../../shared';
//styles
import styles from './PlaylistImage.module.scss';
import general from '../../../../shared/styles/General.module.scss';
import { SquareDiv } from '../../../../shared/ui';

const imageSize = 70;
interface IPlaylistProps {
	source: string;
	alt: string;
	isHover: boolean;
	size: string | number;
}
export const PlaylistImage: FC<IPlaylistProps> = ({
	source,
	alt,
	isHover,
	size,
}) => {
	return (
		<div className={general.relative}>
			<SquareDiv size={size}>
				<img
					src={generateUrl(source)}
					alt={alt}
					width={size}
					height={size}
					className={styles.br8}
				/>
			</SquareDiv>
			{isHover ? (
				<SquareDiv
					size={imageSize}
					className={merge(general.backdrop, styles.br8)}>
					<SquareDiv size={36} className={styles.playButton}>
						<PlayArrowRounded />
					</SquareDiv>
				</SquareDiv>
			) : null}
		</div>
	);
};
