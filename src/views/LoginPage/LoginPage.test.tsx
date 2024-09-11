import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { ThemeContextProvider } from '../../context/Themes';

describe('LoginPage', () => {
  it('handles login correctly', async () => {
    render(
      <ThemeContextProvider>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </ThemeContextProvider>
    );

    // Simulación de entradas de usuario usando findByRole para inputs
    fireEvent.change(await screen.findByRole('textbox', { name: /email/i }), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(await screen.findByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    // Simulación de clic en botón de login
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Espera a que la navegación ocurra
    expect(window.location.pathname).toBe('/users');
  });
});
