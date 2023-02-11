import { FC, HTMLAttributes, ReactNode } from 'react';
import { PlayArrow, PlayArrowRounded } from '@material-ui/icons';
import { generateUrl, merge } from '../../../shared';
import Image from 'next/image';
import styles from '../../../shared/styles/TrackItem.module.scss';
import { SquareDiv } from '../../../components';

const imageSize = 70;
interface TrackImageProps {
	source: string;
	alt: string;
	isHover: boolean;
}
export const TrackImage: FC<TrackImageProps> = ({ source, alt, isHover }) => {
	return (
		<div style={{ position: 'relative' }}>
			<SquareDiv size={imageSize}>
				<Image
					src={generateUrl(source)}
					alt={alt}
					width={70}
					height={70}
					className={styles.br8}
				/>
			</SquareDiv>
			{isHover ? (
				<SquareDiv
					size={imageSize}
					className={merge(styles.backdrop, styles.br8)}>
					<SquareDiv size={36} className={styles.playButton}>
						<PlayArrowRounded />
					</SquareDiv>
				</SquareDiv>
			) : null}
		</div>
	);
};
