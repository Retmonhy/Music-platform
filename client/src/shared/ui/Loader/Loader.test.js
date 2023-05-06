const { Loader } = require('./Loader');
const { screen, render } = require('@testing-library/react');

test('Loader is rendered', () => {
	render(<Loader />);
	const loader = screen.getByTestId('loader');
	expect(loader).toBeInTheDocument();
	expect(loader).toHaveClass('loader');
});
