const { ButtonEl } = require('./ButtonEl');
const { render, screen, fireEvent } = require('@testing-library/react');

describe('ButtonEl comp tests:', () => {
	test('In document', () => {
		render(<ButtonEl>Button title</ButtonEl>);
		const button = screen.getByText(/Button title/i);
		expect(button).toBeInTheDocument();
	});
	test('clickEvent', () => {
		const clickHandler = jest.fn();
		render(<ButtonEl onClick={clickHandler}>Button Title</ButtonEl>);
		const button = screen.getByText(/Button title/i);
		fireEvent.click(button);
		expect(clickHandler).toBeCalled();
	});
});
