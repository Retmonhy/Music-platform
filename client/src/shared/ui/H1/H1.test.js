const { H1 } = require('./H1');
const { render, screen } = require('@testing-library/react');

test('Test h1 render', () => {
	render(<H1>Text for test</H1>);
	const h1Elem = screen.getByText(/Text for test/i);
	expect(h1Elem).toBeInTheDocument();
});
