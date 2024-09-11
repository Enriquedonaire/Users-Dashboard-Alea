import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { ThemeContextProvider } from '../../context/Themes';

describe('NotFoundPage', () => {
  it('renders NotFoundPage correctly', () => {
    render(
      <ThemeContextProvider>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </ThemeContextProvider>
    );

    expect(screen.getByAltText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go Back/i })).toBeInTheDocument();
  });

  it('navigates back to users page when clicking "Go Back" button', () => {
    render(
      <ThemeContextProvider>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </ThemeContextProvider>
    );

    const goBackLink = screen.getByRole('link', { name: /Go Back/i });
    expect(goBackLink).toHaveAttribute('href', '/users');
  });
});
