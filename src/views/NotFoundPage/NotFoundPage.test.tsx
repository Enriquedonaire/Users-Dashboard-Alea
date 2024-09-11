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

   
    const notFoundGif = await screen.findByAltText('404 Not Found');
    expect(notFoundGif).toBeInTheDocument();
    expect(notFoundGif).toHaveAttribute('src', '404-Alea.gif');

   
    const aleaLogo = screen.getByAltText('Alea Logo');
    expect(aleaLogo).toBeInTheDocument();
    expect(aleaLogo).toHaveAttribute('src', 'Alea_img.png');

   
    const goBackButton = screen.getByRole('link', { name: /go back/i });
    expect(goBackButton).toBeInTheDocument();

   
    fireEvent.click(goBackButton);
    expect(window.location.pathname).toBe('/users');
  });
});
