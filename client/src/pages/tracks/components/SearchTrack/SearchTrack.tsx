import { Box, Grid, TextField, debounce } from '@material-ui/core';
import { CustomInput, Loader, useAction } from '@shared';
import { Local } from '@shared/helper/localization';
import { useAppDispatch } from '@shared/store';
import React, { FC } from 'react';
interface ISearchTrackProps {
	searchHandler: (query: string) => void;
	isSearching: boolean;
}

export const SearchTrack: FC<ISearchTrackProps> = ({
	searchHandler,
	isSearching,
}) => {
	const searchTrackHandler = debounce(event => {
		searchHandler(event.target.value);
	}, 500);

	return (
		<Box>
			<CustomInput
				size='small'
				type='search'
				onChange={searchTrackHandler}
				label={Local.Tracks.SearchMusic}
			/>
			<Box> {isSearching ? <Loader /> : null}</Box>
		</Box>
	);
};
