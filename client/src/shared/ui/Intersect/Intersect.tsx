import { Box } from '@material-ui/core';
import React, {
	FC,
	ReactNode,
	memo,
	useCallback,
	useEffect,
	useRef,
} from 'react';
interface IIntersectProps {
	id: string;
	onIntersect: () => void;
	children: ReactNode;
}

export const Intersect: FC<IIntersectProps> = memo(
	({ id, children, onIntersect }) => {
		console.log('intersect render');
		const onIntersectHandler = useCallback(entries => {
			const [entry] = entries;
			if (entry.isIntersecting) onIntersect();
		}, []);
		const containerRef = useRef(null);

		useEffect(() => {
			const observer = new IntersectionObserver(onIntersectHandler);
			if (containerRef.current) observer.observe(containerRef.current);
			return () => {
				if (containerRef.current) observer.unobserve(containerRef.current);
			};
		}, [containerRef]);

		return (
			<Box>
				{children}
				<div ref={containerRef} id={id}></div>
			</Box>
		);
	},
);
