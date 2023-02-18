//libraties
import React, { FC } from 'react';
import Image from 'next/image';
import { PlayArrowRounded } from '@material-ui/icons';
//conponents
import { SquareDiv } from '../../../../components';
import { generateUrl, merge } from '../../../../shared';
//styles
import styles from './PlaylistImage.module.scss';
import general from '../../../../shared/styles/General.module.scss';

const imageSize = 70;
interface IPlaylistProps {
	source: string;
	alt: string;
	isHover: boolean;
}
export const PlaylistImage: FC<IPlaylistProps> = ({ source, alt, isHover }) => {
	return (
		<div className={general.relative}>
			<SquareDiv size={'100%'}>
				<img
					src={generateUrl(source)}
					alt={alt}
					width={'100%'}
					height={'100%'}
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
