import { Box } from '@material-ui/core';
import React, {
	FC,
	ReactNode,
	memo,
	useCallback,
	useEffect,
	useRef,
} from 'react';
import { Loader } from '../Loader/Loader';
interface IIntersectProps {
	id: string;
	onIntersect: () => void;
	children: ReactNode;
	isFetching: boolean;
}

export const Intersect: FC<IIntersectProps> = memo(
	({ id, children, onIntersect, isFetching }) => {
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
				<div ref={containerRef} id={id}>
					{isFetching ? <Loader /> : null}
				</div>
			</Box>
		);
	},
);
