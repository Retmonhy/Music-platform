//libs
import { PlaylistAddRounded } from '@material-ui/icons';
import { FC, MouseEvent } from 'react';
//components
import { PopoverButton } from '@shared/components';
import { Local } from '@shared/const/Localization';
interface IQueueAddProps {
	onClick: () => void;
}
export const QueueAdd: FC<IQueueAddProps> = ({ onClick }) => {
	const handleAddToQueue = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		onClick();
	};
	return (
		<PopoverButton text={Local.Tracks.PlayNext} onClick={handleAddToQueue}>
			<PlaylistAddRounded className='icon-button' />
		</PopoverButton>
	);
};
