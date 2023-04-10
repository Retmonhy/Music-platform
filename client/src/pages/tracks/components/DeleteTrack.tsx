import { CloseRounded } from '@material-ui/icons';
import { FC, MouseEvent } from 'react';
import general from '@shared/styles/General.module.scss';
import { PopoverButton } from '@shared';
interface IDeleteTrackProps {
	onClick: (e: MouseEvent<HTMLDivElement>) => void;
}
export const DeleteTrack: FC<IDeleteTrackProps> = ({ onClick }) => {
	return (
		<PopoverButton text={'Удалить из текущего плейлиста'} onClick={onClick}>
			<CloseRounded className={general.iconButton} />
		</PopoverButton>
	);
};
