import { AddRounded } from '@material-ui/icons';
import React, { FC, MouseEvent } from 'react';
import { PopoverButton } from '@shared/components';
import { Local } from '@shared/const/Localization';
interface IAddTrackProps {
	onClick: () => void;
}
export const AddTrack: FC<IAddTrackProps> = ({ onClick }) => {
	const handleAdd = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		onClick();
	};
	return (
		<PopoverButton text={Local.Tracks.AddToMyMusic} onClick={handleAdd}>
			<AddRounded className='icon-button' />
		</PopoverButton>
	);
};
