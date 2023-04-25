//libs
import { PlaylistAddRounded } from '@material-ui/icons';
import { Popover } from '@mui/material';
import { FC, useState, MouseEvent } from 'react';
//styles
import styles from './../..';
import general from '@shared/styles/General.module.scss';
//components
import { PopoverButton } from '@shared';
import { Local } from '@shared/helper/localization';
interface IQueueAddProps {
	onClick: (e: MouseEvent<HTMLDivElement>) => void;
}
export const QueueAdd: FC<IQueueAddProps> = ({ onClick }) => {
	return (
		<PopoverButton text={Local.Tracks.PlayNext} onClick={onClick}>
			<PlaylistAddRounded className={general.iconButton} />
		</PopoverButton>
	);
};
