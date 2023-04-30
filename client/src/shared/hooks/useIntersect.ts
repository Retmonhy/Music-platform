import { useAppDispatch } from '@shared/store';
import { useCallback, useRef } from 'react';

export const useIntersect = (fetchingMethod, pageSize) => {
	const dispatch = useAppDispatch();
	const pageRef = useRef<number>(0);
	//больше не надо слать запросы, если в последнем запросе пришло меньше целевого количества чего-либ (значит на сервере закончились сущности)
	const stopRequesting = useRef<boolean>(false);
	const onIntersect = useCallback(() => {
		return new Promise((resolve, reject) => {
			if (!stopRequesting.current) {
				let result = dispatch(
					fetchingMethod({ page: pageRef.current, pageSize }),
				);
				result
					.then(res => {
						pageRef.current += 1;
						if (res.payload.length < pageSize) {
							stopRequesting.current = true;
						}
						resolve(res);
					})
					.catch((error: Error) => {
						reject('onIntersect ERROR: ' + error.message);
					});
			}
		});
	}, []);
	return { onIntersect, pageRef };
};
