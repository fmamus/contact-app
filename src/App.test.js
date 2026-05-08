import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.localStorage.clear();
});

test('renders contact manager', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /contacts/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add contact/i })).toBeInTheDocument();
});
