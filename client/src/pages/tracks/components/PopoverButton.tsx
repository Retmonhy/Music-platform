import { CloseRounded } from '@material-ui/icons';
import { Popover } from '@mui/material';
import { FC, useState, MouseEvent, ReactNode } from 'react';
import styles from '../../../shared/styles/TrackItem.module.scss';
import general from '../../../shared/styles/General.module.scss';
import { SquareDiv } from '../../../shared';
interface IPopoverButtonProps {
	onClick: (e: MouseEvent<HTMLDivElement>) => void;
	text: string;
	children: ReactNode;
}
export const PopoverButton: FC<IPopoverButtonProps> = ({
	onClick,
	text,
	children,
}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const handlePopoverClose = () => setAnchorEl(null);
	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const open = Boolean(anchorEl);

	return (
		<>
			<SquareDiv
				size={30}
				className={general.relative}
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
				onClick={onClick}>
				{children}
				<Popover
					classes={{ paper: styles.popover }}
					sx={{
						pointerEvents: 'none',
					}}
					open={open}
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}>
					{text}
				</Popover>
			</SquareDiv>
		</>
	);
};
