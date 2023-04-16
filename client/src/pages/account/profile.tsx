import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AccountRoutes, StorageKeys, useTypedSelector } from '@shared';
import { ContentBlock, UpdateProfileForm, AccountLayout } from './components';
import { Loader } from '@shared/ui';

const Account = () => {
	const { user, isLoading } = useTypedSelector(i => i.account);
	const router = useRouter();
	useEffect(() => {
		if (
			!user &&
			localStorage &&
			!localStorage.getItem(StorageKeys.accessToken)
		) {
			router && router.push(AccountRoutes.Login);
		}
	}, [user]);
	return (
		<AccountLayout>
			<ContentBlock header='Личные данные'>
				{isLoading ? <Loader /> : <UpdateProfileForm />}
			</ContentBlock>
		</AccountLayout>
	);
};
export default Account;
