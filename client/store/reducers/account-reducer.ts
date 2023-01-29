import { AccountActionTypes, AccountState } from './../../types/account';
import { AccountAction } from '../../types';

const initialState: AccountState = {
	accessToken: null,
	refreshToken: null,
	user: null,
	isLoading: false,
	isAuth: false,
};
export const accountReducer = (state = initialState, action: AccountAction) => {
	switch (action.type) {
		case AccountActionTypes.LOADING:
			return { ...state, isLoading: action.payload };
		case AccountActionTypes.AUTHORIZATION:
			return { ...state, isAuth: true, ...action.payload };
		case AccountActionTypes.LOGOUT:
			return { ...initialState };
		case AccountActionTypes.UPDATE:
			return { ...state, user: action.payload };
		default:
			return state;
	}
};
