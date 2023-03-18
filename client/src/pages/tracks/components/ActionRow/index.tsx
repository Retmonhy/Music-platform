import React, { FC, MouseEvent } from 'react';
import { DeleteTrack } from '../DeleteTrack';
import { AddTrack } from '../AddTrack';
import { ActionMenu } from '../ActionMenu';
import styles from './ActionRow.module.scss';
import { Box } from '@material-ui/core';
interface IActionRowHandlers {
	deleteHandler: (e: MouseEvent<HTMLDivElement>) => void;
	addHandler: (e: MouseEvent<HTMLDivElement>) => void;
}
interface IActionRowProps {
	isExistInUserMusic: boolean;
	handlers: IActionRowHandlers;
}

export const ActionRow: FC<IActionRowProps> = ({
	isExistInUserMusic,
	handlers,
}) => {
	const { addHandler, deleteHandler } = handlers;
	return (
		<Box className={styles.actionRow}>
			{isExistInUserMusic ? (
				<DeleteTrack onClick={deleteHandler} />
			) : (
				<AddTrack onClick={addHandler} />
			)}
			<ActionMenu />
		</Box>
	);
};
