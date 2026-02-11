import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero and stats sections', () => {
  render(<App />);
  expect(screen.getByText('Buffet Elegance')).toBeInTheDocument();
  expect(screen.getByText('+300')).toBeInTheDocument();
});
