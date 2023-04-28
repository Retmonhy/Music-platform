import { AddRounded } from '@material-ui/icons';
import React, { FC, MouseEvent } from 'react';
import { PopoverButton } from '@shared';
import { Local } from '@shared/helper/localization';
interface IAddTrackProps {
	onClick: (event: MouseEvent<HTMLDivElement>) => void;
}
export const AddTrack: FC<IAddTrackProps> = ({ onClick }) => {
	return (
		<PopoverButton text={Local.Tracks.AddToMyMusic} onClick={onClick}>
			<AddRounded className='icon-button' />
		</PopoverButton>
	);
};
