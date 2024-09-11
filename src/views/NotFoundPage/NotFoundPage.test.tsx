import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { ThemeContextProvider } from '../../context/Themes';

describe('NotFoundPage', () => {
  it('renders the 404 image and "Go Back" button', async () => {
    render(
      <ThemeContextProvider>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </ThemeContextProvider>
    );

    // Verifica que la imagen de 404 se esté mostrando
    const notFoundGif = await screen.findByAltText('404 Not Found');
    expect(notFoundGif).toBeInTheDocument();
    expect(notFoundGif).toHaveAttribute('src', '404-Alea.gif');

    // Verifica que el logo de Alea se esté mostrando
    const aleaLogo = screen.getByAltText('Alea Logo');
    expect(aleaLogo).toBeInTheDocument();
    expect(aleaLogo).toHaveAttribute('src', 'Alea_img.png');

    // Verifica que el botón "Go Back" esté en el documento
    const goBackButton = screen.getByRole('link', { name: /go back/i });
    expect(goBackButton).toBeInTheDocument();

    // Verifica que el botón "Go Back" redirige a "/users"
    fireEvent.click(goBackButton);
    expect(window.location.pathname).toBe('/users');
  });
});
