import { IsSsrMobileContext } from '../../pages/_app.page';
import { useContext } from 'react';
import { useWindowSize } from './useWindowSize';

export const useIsMobile = () => {
	const isSsrMobile = useContext(IsSsrMobileContext);
	const { width } = useWindowSize();
	const isBrowserMobile = !!width && width < 992;

	return isSsrMobile || isBrowserMobile;
};
