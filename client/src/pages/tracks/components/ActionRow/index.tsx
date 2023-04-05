import React, { FC, MouseEvent } from 'react';
import { DeleteTrack } from '../DeleteTrack';
import { AddTrack } from '../AddTrack';
import { ActionMenu } from '../ActionMenu';
import styles from './ActionRow.module.scss';
import { Grid } from '@material-ui/core';
import { QueueAdd } from '../QueueAdd';
interface IActionRowHandlers {
	deleteHandler: (e: MouseEvent<HTMLDivElement>) => void;
	addHandler: (e: MouseEvent<HTMLDivElement>) => void;
	queueAddHandler: (e: MouseEvent<HTMLDivElement>) => void;
}
interface IActionRowProps {
	isActive: boolean;
	isExistInUserMusic: boolean;
	handlers: IActionRowHandlers;
}

export const ActionRow: FC<IActionRowProps> = ({
	isActive,
	isExistInUserMusic,
	handlers,
}) => {
	const { addHandler, deleteHandler, queueAddHandler } = handlers;
	return (
		<Grid container direction='row' wrap='nowrap'>
			{!isActive && <QueueAdd onClick={queueAddHandler} />}
			{isExistInUserMusic ? (
				<DeleteTrack onClick={deleteHandler} />
			) : (
				<AddTrack onClick={addHandler} />
			)}
			<ActionMenu addToPlaylist={() => {}} />
		</Grid>
	);
};
