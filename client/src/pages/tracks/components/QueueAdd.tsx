//libs
import { QueueMusicRounded } from '@material-ui/icons';
import { Popover } from '@mui/material';
import { FC, useState, MouseEvent } from 'react';
//styles
import styles from './../..';
import general from './../../../shared/styles/General.module.scss';
//components
import { PopoverButton } from './PopoverButton';
interface IQueueAddProps {
	onClick: (e: MouseEvent<HTMLDivElement>) => void;
}
export const QueueAdd: FC<IQueueAddProps> = ({ onClick }) => {
	return (
		<PopoverButton text={'Воспроизвести следующей'} onClick={onClick}>
			<QueueMusicRounded className={general.iconButton} />
		</PopoverButton>
	);
};
