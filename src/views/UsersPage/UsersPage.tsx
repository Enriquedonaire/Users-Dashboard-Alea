import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialReactTable } from 'material-react-table';
import { fetchUsers as fetchUsersFromApi } from '../../api/api.Data';
import {
  Button,
  CircularProgress,
  Select,
  MenuItem,
  Box,
  Grid,
  Typography,
  IconButton,
} from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import AleaImage from '../../assets/Alea_img.png';
import { useThemeContext } from '../../context/Themes';
import '../../styles/styles.less';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { darkMode, toggleTheme } = useThemeContext(); 
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUsersFromApi(page + 1, perPage);
      setUsers(data.data);
      setTotalPages(data.total_pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching users', error);
    }
  }, [page, perPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box padding="20px">
      <Grid container justifyContent="space-between" alignItems="center" marginBottom="20px">
        <Grid item>
          <img src={AleaImage} alt="Alea Logo" className="logo" />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={logout} className={darkMode ? 'mui-button-dark' : 'mui-button-primary'}>
            Logout
          </Button>
          <IconButton onClick={toggleTheme} color="inherit" style={{ marginLeft: '10px' }} >
            {darkMode ? <LightMode fontSize="large" /> : <DarkMode fontSize="large" />}
          </IconButton>
          <Typography variant="body1" style={{ marginLeft: '1px', marginRight: '15px', display: 'inline' }}>
            {darkMode ? 'Light' : 'Dark'}
          </Typography>
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress />
      ) : (
        <MaterialReactTable
          columns={[
            {
              accessorKey: 'avatar',
              header: 'Avatar',
              Cell: ({ cell }) => (
                <img
                  src={cell.getValue<string>()}
                  alt="avatar"
                  width={50}
                  style={{ borderRadius: '50%' }}
                />
              ),
            },
            {
              accessorKey: 'first_name',
              header: 'First Name',
            },
            {
              accessorKey: 'last_name',
              header: 'Last Name',
            },
            {
              accessorKey: 'email',
              header: 'Email',
            },
          ]}
          data={users}
          muiTableContainerProps={{
            sx: { maxHeight: '500px' },
          }}
          manualPagination
          enablePagination={false}
          rowCount={totalPages * perPage}
          state={{ pagination: { pageIndex: page, pageSize: perPage } }}
        />
      )}
      <Grid container className="pagination-container">
        <Typography variant="body1">
          Página {page + 1} de {totalPages}
        </Typography>
        <Button
          variant="contained"
          className={darkMode ? 'mui-button-dark' : 'mui-button-primary'}
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          className={darkMode ? 'mui-button-dark' : 'mui-button-primary'}
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
        <Select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          style={{ marginLeft: '10px' }}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </Grid>
    </Box>
  );
};

export default UsersPage;
