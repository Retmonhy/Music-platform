import { MoreHorizRounded } from '@material-ui/icons';
import React from 'react';
import { SquareDiv } from '../../../components';
import styles from '../../../shared/styles/TrackItem.module.scss';
export const ActionMenu = () => {
	return (
		<SquareDiv size={30}>
			<MoreHorizRounded className={styles.actionIcons} />
		</SquareDiv>
	);
};
