import { CloseRounded } from '@material-ui/icons';
import { FC, MouseEvent } from 'react';
import { PopoverButton } from '@shared';
import { Local } from '@shared/helper/localization';
interface IDeleteTrackProps {
	onClick: (e: MouseEvent<HTMLDivElement>) => void;
}
export const DeleteTrack: FC<IDeleteTrackProps> = ({ onClick }) => {
	return (
		<PopoverButton
			text={Local.Tracks.DeleteFromCurrentPlaylist}
			onClick={onClick}>
			<CloseRounded className='icon-button' />
		</PopoverButton>
	);
};
