import { RootState } from './reducers/index';
import { Context, createWrapper } from 'next-redux-wrapper';
import { combineReducers, createStore, Store } from 'redux';
import { reducer } from './reducers';

const makeStore = (context: Context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
	debug: true,
});
