import { Box, Grid, TextField, debounce } from '@material-ui/core';
import { CustomInput, Loader, useAction } from '@shared';
import { Local } from '@shared/const/localization';
import { useAppDispatch } from '@shared/store';
import React, { FC } from 'react';
interface ISearchInputProps {
	searchHandler: (query: string) => void;
	isSearching: boolean;
}

export const SearchInput: FC<ISearchInputProps> = ({ searchHandler, isSearching }) => {
	const searchInputHandler = debounce(event => {
		searchHandler(event.target.value);
	}, 500);

	return (
		<Box>
			<CustomInput size='small' type='search' onChange={searchInputHandler} label={Local.Tracks.SearchMusic} />
			<Box> {isSearching ? <Loader /> : null}</Box>
		</Box>
	);
};
