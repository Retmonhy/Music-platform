import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AccountRoutes, StorageKeys, Toast } from '@shared';
import { useTypedSelector } from '@shared/hooks';
import { ContentBlock, UpdateProfileForm, AccountLayout } from './components';
import { Loader } from '@shared/ui';
import { Local } from '@shared/const/Localization';

const Account = () => {
	const { user, isLoading } = useTypedSelector(i => i.account);
	const router = useRouter();
	useEffect(() => {
		if (!user && localStorage && !localStorage.getItem(StorageKeys.accessToken)) {
			router && router.push(AccountRoutes.Login);
		}
	}, [user]);
	return (
		<AccountLayout>
			<ContentBlock header={Local.Account.PersonalData}>{isLoading ? <Loader /> : <UpdateProfileForm />}</ContentBlock>
		</AccountLayout>
	);
};
export default Account;
