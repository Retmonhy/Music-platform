//libs
import { PlaylistAddRounded } from '@material-ui/icons';
import { FC, MouseEvent } from 'react';
//components
import { PopoverButton } from '@shared';
import { Local } from '@shared/helper/localization';
interface IQueueAddProps {
	onClick: (e: MouseEvent<HTMLDivElement>) => void;
}
export const QueueAdd: FC<IQueueAddProps> = ({ onClick }) => {
	return (
		<PopoverButton text={Local.Tracks.PlayNext} onClick={onClick}>
			<PlaylistAddRounded className='icon-button' />
		</PopoverButton>
	);
};
