import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UsersPage from './UsersPage';
import { ThemeContextProvider } from '../../context/Themes';
import { fetchUsers } from '../../api/api.Data';

jest.mock('../../api/api.Data', () => ({
  fetchUsers: jest.fn(),
}));

describe('UsersPage', () => {
  beforeEach(() => {
    (fetchUsers as jest.Mock).mockResolvedValue({
      data: [{ id: 1, email: 'test@example.com', first_name: 'John', last_name: 'Doe', avatar: '' }],
      total_pages: 1,
    });
  });

  it('renders users table and pagination controls', async () => {
    render(
      <ThemeContextProvider>
        <BrowserRouter>
          <UsersPage />
        </BrowserRouter>
      </ThemeContextProvider>
    );

    
    expect(await screen.findByText(/john/i)).toBeInTheDocument();

    
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });
});
