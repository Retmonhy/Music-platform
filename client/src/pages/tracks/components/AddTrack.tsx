import { AddRounded } from '@material-ui/icons';
import React, { FC, MouseEvent } from 'react';
import { PopoverButton } from './PopoverButton';
import general from '@shared/styles/General.module.scss';
interface IAddTrackProps {
	onClick: (event: MouseEvent<HTMLDivElement>) => void;
}
export const AddTrack: FC<IAddTrackProps> = ({ onClick }) => {
	return (
		<PopoverButton text={'Добавить в мою музыку'} onClick={onClick}>
			<AddRounded className={general.iconButton} />
		</PopoverButton>
	);
};
