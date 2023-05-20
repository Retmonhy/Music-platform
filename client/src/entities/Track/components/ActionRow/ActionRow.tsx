import React, { FC } from 'react';
import { DeleteTrack } from '../DeleteTrack';
import { AddTrack } from '../AddTrack';
import { QueueAdd } from '../QueueAdd';
import { ActionMenu } from '../ActionMenu';
import { Grid } from '@material-ui/core';
interface IActionRowHandlers {
	deleteHandler: () => void;
	addHandler: () => void;
	queueAddHandler: () => void;
}
interface IActionRowProps {
	isActive: boolean;
	isExistInUserMusic: boolean;
	handlers: IActionRowHandlers;
}

export const ActionRow: FC<IActionRowProps> = ({ isActive, isExistInUserMusic, handlers }) => {
	const { addHandler, deleteHandler, queueAddHandler } = handlers;
	return (
		<Grid container direction='row' wrap='nowrap'>
			{!isActive && <QueueAdd onClick={queueAddHandler} />}
			{isExistInUserMusic ? <DeleteTrack onClick={deleteHandler} /> : <AddTrack onClick={addHandler} />}
			<ActionMenu />
		</Grid>
	);
};
