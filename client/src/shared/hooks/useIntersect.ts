import { useAppDispatch } from '@shared/store';
import { useCallback, useRef } from 'react';

export const useIntersect = (fetchingMethod, pageSize) => {
	const dispatch = useAppDispatch();
	const pageRef = useRef<number>(0);
	const stopRequesting = useRef<boolean>(false);
	const onIntersect = useCallback(() => {
		if (!stopRequesting.current) {
			let result = dispatch(
				fetchingMethod({ page: pageRef.current, pageSize }),
			);
			result.then(res => {
				pageRef.current += 1;
				if (res.payload.length < pageSize) {
					stopRequesting.current = true;
				}
			});
		}
	}, []);
	return { onIntersect };
};
