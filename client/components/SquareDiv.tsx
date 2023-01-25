import { FC, HTMLAttributes, ReactNode } from 'react';

interface SquareDivProps extends HTMLAttributes<HTMLDivElement> {
	size: number | string;
	children: ReactNode;
}
export const SquareDiv: FC<SquareDivProps> = ({ size, children, ...props }) => {
	return (
		<div
			{...props}
			style={{
				width: typeof size === 'string' ? size : `${size}px`,
				height: typeof size === 'string' ? size : `${size}px`,
				...props.style,
			}}>
			{children}
		</div>
	);
};
