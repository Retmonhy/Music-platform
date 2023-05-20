// libs
import React, { FC, MouseEvent } from 'react';
import { AddRounded, ArrowForwardIosRounded, CloseRounded, PlaylistAddRounded, PlaylistPlayRounded } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
// shared
import type { IBottomSheetProps } from '@shared/components';
import { BottomSheet, ButtonEl, Toast } from '@shared/components';
import { Local } from '@shared/const';
//module
import { TrackInfo } from '../TrackInfo';
import { TrackImage } from '../TrackImage';
import { useTrackContext } from '../../lib/hooks';

interface ITrackBottomSheetHandlers {
	deleteHandler: () => void;
	addHandler: () => void;
	queueAddHandler: () => void;
	navigateToTrackPage: () => void;
}
interface ITrackBottomSheetProps extends Omit<IBottomSheetProps, 'children'> {
	isExistInUserMusic: boolean;
	handlers: ITrackBottomSheetHandlers;
}

export const TrackBottomSheet: FC<ITrackBottomSheetProps> = ({ open, onClose, isExistInUserMusic, handlers }) => {
	const { track } = useTrackContext();
	const { queueAddHandler, addHandler, deleteHandler, navigateToTrackPage } = handlers;
	const handleNavigateToTrackPage = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		navigateToTrackPage();
		onClose();
	};
	const handleAddToQueue = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		queueAddHandler();
		new Toast({ type: 'success', message: 'Аудиозапись добавлена в очередь' });
		onClose();
	};
	const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		addHandler();
		onClose();
	};
	const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		deleteHandler();
		new Toast({ type: 'info', message: 'Аудиозапись удалена' });
		onClose();
	};
	const playlistAddHandler = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		console.log('redirect to playlist addding');
		new Toast({
			type: 'info',
			message: 'В мобильной версии должен быть редирект на страницу с выбором плейлиста, куда добавить трек',
		});
		onClose();
	};
	return (
		<BottomSheet open={open} onClose={onClose}>
			<Box className='track bs__track' onClick={handleNavigateToTrackPage}>
				<TrackImage source={track.picture} alt={track.name} isHover={false} />
				<TrackInfo className='track__info' title={track.name} description={track.artist} titleClick={() => {}} />
				<Box className='track__time'>
					<IconButton onClick={() => {}} className='next-icon'>
						<ArrowForwardIosRounded className='icon-button' fontSize='inherit' />
					</IconButton>
				</Box>
			</Box>
			<Box className='bs__buttons'>
				<ButtonEl className='bs__button' startIcon={<PlaylistPlayRounded className='bs__button_icon' />} onClick={handleAddToQueue}>
					{Local.Tracks.PlayNext}
				</ButtonEl>
				{isExistInUserMusic ? (
					<ButtonEl className='bs__button' startIcon={<CloseRounded className='bs__button_icon' />} onClick={handleDelete}>
						{Local.Tracks.DeleteFromCurrentPlaylist}
					</ButtonEl>
				) : (
					<ButtonEl className='bs__button' startIcon={<AddRounded className='bs__button_icon' />} onClick={handleAdd}>
						{Local.Tracks.AddToMyMusic}
					</ButtonEl>
				)}
				<ButtonEl className='bs__button' startIcon={<PlaylistAddRounded className='bs__button_icon' />} onClick={playlistAddHandler}>
					{Local.Tracks.AddToPlaylist}
				</ButtonEl>
			</Box>
		</BottomSheet>
	);
};
export default TrackBottomSheet;
