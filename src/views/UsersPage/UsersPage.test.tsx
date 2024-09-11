import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UsersPage from './UsersPage';
import { ThemeContextProvider } from '../../context/Themes';

describe('UsersPage', () => {
  it('renders UsersPage correctly', () => {
    render(
      <ThemeContextProvider>
        <BrowserRouter>
          <UsersPage />
        </BrowserRouter>
      </ThemeContextProvider>
    );

    expect(screen.getByText(/Users/i)).toBeInTheDocument();
  });

  it('fetches and displays users', async () => {
    render(
      <ThemeContextProvider>
        <BrowserRouter>
          <UsersPage />
        </BrowserRouter>
      </ThemeContextProvider>
    );

    const user = await screen.findByText(/email@example.com/i); // Ajusta esto según los datos de tu API mock
    expect(user).toBeInTheDocument();
  });

  it('logs out when clicking logout button', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

    render(
      <ThemeContextProvider>
        <BrowserRouter>
          <UsersPage />
        </BrowserRouter>
      </ThemeContextProvider>
    );

    fireEvent.click(screen.getByText(/Logout/i));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('toggles theme correctly', () => {
    render(
      <ThemeContextProvider>
        <BrowserRouter>
          <UsersPage />
        </BrowserRouter>
      </ThemeContextProvider>
    );

    const toggleButton = screen.getByRole('button', { name: /Dark/i });
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Light/i)).toBeInTheDocument();
  });
});
