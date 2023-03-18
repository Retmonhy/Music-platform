//libraries
import { FC } from 'react';
import { PlayArrowRounded } from '@material-ui/icons';
import Image from 'next/image';
//components
import { SquareDiv, generateUrl, merge } from '../../../shared';
//styles
import styles from '../../../shared/styles/TrackItem.module.scss';
import general from '../../../shared/styles/General.module.scss';

const imageSize = 70;
interface TrackImageProps {
	source: string;
	alt: string;
	isHover: boolean;
}
export const TrackImage: FC<TrackImageProps> = ({ source, alt, isHover }) => {
	return (
		<div className={general.relative}>
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
					className={merge(general.backdrop, styles.br8)}>
					<SquareDiv size={36} className={styles.playButton}>
						<PlayArrowRounded />
					</SquareDiv>
				</SquareDiv>
			) : null}
		</div>
	);
};
