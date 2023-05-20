import { CloseRounded } from '@material-ui/icons';
import { FC, MouseEvent } from 'react';
import { PopoverButton } from '@shared/components';
import { Local } from '@shared/const/Localization';
interface IDeleteTrackProps {
	onClick: () => void;
}
export const DeleteTrack: FC<IDeleteTrackProps> = ({ onClick }) => {
	const handleDelete = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		onClick();
	};
	return (
		<PopoverButton text={Local.Tracks.DeleteFromCurrentPlaylist} onClick={handleDelete}>
			<CloseRounded className='icon-button' />
		</PopoverButton>
	);
};
