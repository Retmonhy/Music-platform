import { Box, Popover } from '@mui/material';
import { FC, useState, MouseEvent, ReactNode } from 'react';
interface IPopoverButtonProps {
	onClick: (e: MouseEvent<HTMLDivElement>) => void;
	text: string;
	children: ReactNode;
}
export const PopoverButton: FC<IPopoverButtonProps> = ({ onClick, text, children }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const handlePopoverClose = () => setAnchorEl(null);
	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const open = Boolean(anchorEl);

	return (
		<>
			<Box className='popover-button relative' onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} onClick={onClick}>
				{children}
				<Popover
					data-testid='popover'
					classes={{ paper: 'popover' }}
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
			</Box>
		</>
	);
};
