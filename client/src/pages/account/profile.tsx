import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Loader } from '../../components/Loader';
import { AccountRoutes, StorageKeys, useTypedSelector } from '../../shared';
import {
	ContentBlock,
	LeftSideMenu,
	UpdateProfileForm,
	AccountLayout,
} from './components';

const Account = () => {
	const { user, isLoading } = useTypedSelector(i => i.account);
	const router = useRouter();
	useEffect(() => {
		if (!user && !localStorage.getItem(StorageKeys.accessToken)) {
			router && router.push(AccountRoutes.Login);
		}
	}, [user]);
	return (
		<AccountLayout>
			{isLoading ? (
				<Loader />
			) : (
				<ContentBlock header='Личные данные'>
					<UpdateProfileForm />
				</ContentBlock>
			)}
		</AccountLayout>
	);
};
export default Account;
