import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { ThemeContextProvider } from '../../context/Themes';

describe('LoginPage', () => {
  it('renders LoginPage correctly', () => {
    render(
      <ThemeContextProvider>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </ThemeContextProvider>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('shows an error when login fails', async () => {
    render(
      <ThemeContextProvider>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </ThemeContextProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'invalid' } });
    fireEvent.click(screen.getByText(/login/i));

    const errorMessage = await screen.findByText(/Invalid credentials. Please try again./i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('toggles theme correctly', () => {
    render(
      <ThemeContextProvider>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </ThemeContextProvider>
    );

    const toggleButton = screen.getByRole('button', { name: /Dark/i });
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Light/i)).toBeInTheDocument();
  });
});
