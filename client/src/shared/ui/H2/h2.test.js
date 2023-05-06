const { H2 } = require('./H2');
const { render, screen } = require('@testing-library/react');

test('Test h2 render', () => {
	render(<H2>Check h2 component</H2>);
	const h2Elem = screen.getByText(/Check h2 component/i);
	expect(h2Elem).toBeInTheDocument();
});
