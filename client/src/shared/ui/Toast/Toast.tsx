import { createPortal, createRoot, render as aaa } from 'react-dom/client';
import { Snackbar } from '@material-ui/core';
import {
	Alert,
	AlertColor,
	AlertProps,
	Slide,
	SlideProps,
	SnackbarCloseReason,
} from '@mui/material';
import React from 'react';
export enum ToastType {
	info = 'info',
}
interface IToastProps extends AlertProps {
	type: AlertColor;
	message: string;
}

function SlideTransition(props: SlideProps) {
	return <Slide {...props} direction='left' />;
}

export class Toast {
	type: AlertColor;
	message: string;
	isOpened: boolean = true;
	static container: any;

	constructor(props: IToastProps) {
		if (!Toast.container) {
			Toast.container = createRoot(document.getElementById('toast-container'));
		}
		this.type = props.type;
		this.message = props.message;

		this.closeToast = this.closeToast.bind(this);
		this.renderToast.bind(this)();
	}
	closeToast(event, reason: SnackbarCloseReason) {
		if (reason === 'timeout') {
			this.isOpened = false;
			this.renderToast();
		}
	}
	renderToast() {
		Toast.container.render(
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				TransitionComponent={SlideTransition}
				open={this.isOpened}
				onClick={() => console.log('close toast')}
				autoHideDuration={5000}
				onClose={this.closeToast}>
				<Alert variant='filled' severity={this.type}>
					{this.message}
				</Alert>
			</Snackbar>,
		);
	}
}
