const { ScoreboardRounded } = require('@mui/icons-material');
const { PopoverButton } = require('./PopoverButton');
const { render, screen, fireEvent } = require('@testing-library/react');

describe('PopoverButton tests', () => {
	const mockFn = jest.fn();
	test('popoverButton render', () => {
		render(<PopoverButton onClick={mockFn} text='Popover test' children={<button>Кнопка</button>} />);
		expect(screen.queryByTestId('popover')).toBeNull();
		const popButton = screen.getByText(/Кнопка/i);
		fireEvent.mouseEnter(popButton);
		expect(screen.getByTestId('popover')).toBeInTheDocument();
	});
});
