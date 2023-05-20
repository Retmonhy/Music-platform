//libraries
import { FC } from 'react';
import { PlayArrowRounded } from '@material-ui/icons';
import Image from 'next/image';
//components
import { generateUrl } from '@shared/lib';
import { Box } from '@mui/material';

interface TrackImageProps {
	source: string;
	alt: string;
	isHover: boolean;
}
export const TrackImage: FC<TrackImageProps> = ({ source, alt, isHover }) => {
	return (
		<Box className='track-image relative'>
			<Box className='track-image__wrapper'>
				<Image src={generateUrl(source)} layout='fill' alt={alt} className='br8 track-image__wrapper' />
			</Box>
			{isHover ? (
				<Box className='br8 backdrop track-image__wrapper'>
					<Box className='track-image__play'>
						<PlayArrowRounded />
					</Box>
				</Box>
			) : null}
		</Box>
	);
};
