import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import store from 'src2/shared/store';
import { RootState } from 'src2/shared/store/reducers';

type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
export const useAppDispatch = () => store.dispatch as NextThunkDispatch;
