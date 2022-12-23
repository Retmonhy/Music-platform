import { AccountActionTypes } from './../../types/account';
import { AccountAction } from '../../types';

const initialState = {
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
		case AccountActionTypes.REGISTRATION:
			return { ...state, ...action.payload };
		case AccountActionTypes.LOGIN:
			return { ...state, isAuth: true, ...action.payload };
		case AccountActionTypes.LOGOUT:
			return { ...initialState };
		case AccountActionTypes.REFRESH:
			return { ...state };
		default:
			return state;
	}
};
