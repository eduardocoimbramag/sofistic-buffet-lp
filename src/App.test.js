import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero and stats sections', () => {
  render(<App />);
  expect(screen.getByText('Sofistic Buffet', { selector: 'h1' })).toBeInTheDocument();
  expect(screen.getByText('+300')).toBeInTheDocument();
});
