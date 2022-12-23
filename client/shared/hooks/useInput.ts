import React, { ChangeEvent } from 'react';

export const useInput = () => {
	const [value, setValue] = React.useState<string>('');

	const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const val = evt.target.value;
		setValue(val);
	};
	const reset = () => {
		setValue('');
	};
	return { value, onChange, reset };
};
