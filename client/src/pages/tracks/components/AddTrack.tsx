import { AddRounded } from '@material-ui/icons';
import React, { FC, MouseEvent } from 'react';
import { PopoverButton } from './PopoverButton';
import styles from '../components/ActionRow/ActionRow.module.scss';
interface IAddTrackProps {
	onClick: (event: MouseEvent<HTMLDivElement>) => void;
}
export const AddTrack: FC<IAddTrackProps> = ({ onClick }) => {
	return (
		<PopoverButton text={'Добавить в мою музыку'} onClick={onClick}>
			<AddRounded className={styles.actionIcons} />
		</PopoverButton>
	);
};
