import { Backdrop, Box } from '@mui/material';
import React, { FC, ReactNode, useState, useRef } from 'react';
export interface IBottomSheetProps {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
}
export const BottomSheet: FC<IBottomSheetProps> = ({
	open,
	onClose,
	children,
}) => {
	//state
	const [startTouch, setStartTouch] = useState(null);
	const bsref = useRef<HTMLDivElement>();
	//handlers
	const handleBackdropClick = event => {
		event.stopPropagation();
		onClose();
	};
	const onTouchStart = event => {
		event.stopPropagation();
		const currentTouch = event.changedTouches[0];
		setStartTouch(currentTouch);
	};
	const onTouchEnd = event => {
		event.stopPropagation();
		const currentTouch = event.changedTouches[0];
		if (startTouch && startTouch.clientY < currentTouch.clientY) {
			onClose();
			setStartTouch(null);
		}
	};
	const onTouchMove = event => {
		event.stopPropagation();
		const currentTouch = event.changedTouches[0];
		if (startTouch && startTouch.clientY < currentTouch.clientY) {
			bsref.current.style.bottom =
				16 + startTouch.clientY - currentTouch.clientY + 'px';
		} else {
			bsref.current.style.bottom = '16px';
		}
	};
	const stopPropagation = e => e.stopPropagation();
	return (
		<Backdrop
			sx={{
				zIndex: theme => theme.zIndex.drawer + 1,
			}}
			open={open}
			onClick={handleBackdropClick}>
			<div
				ref={bsref}
				className='bottom-sheet'
				onClick={stopPropagation}
				onTouchEnd={onTouchEnd}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}>
				{children}
			</div>
		</Backdrop>
	);
};
