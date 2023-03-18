import React, { FC, useRef } from 'react';
import { IPlaylist } from '../../../types/playlist';
import { SquareDiv } from '../../../components';
import { Box } from '@mui/material';
import { MusicInfo, generateUrl } from '../../../shared';
import Image from 'next/image';
import { PlaylistImage } from './PlaylistImage';

interface IPlaylistItemProps {
	item: IPlaylist;
}
const imageSize = '200px';

export const PlaylistItem: FC<IPlaylistItemProps> = ({ item }) => {
	const navigateToPlaylist = () => {};
	return (
		<Box flexBasis={'33.33%'}>
			<Box padding={'8px'}>
				<SquareDiv size={imageSize}>
					<PlaylistImage
						source={item.cover}
						alt={item.cover}
						isHover={false}
						size={imageSize}
					/>
				</SquareDiv>
				<MusicInfo
					// className={}
					title={item.name}
					description={item.owner_id}
					titleClick={navigateToPlaylist}
				/>
			</Box>
		</Box>
	);
};
