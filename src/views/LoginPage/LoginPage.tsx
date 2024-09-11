import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/api.Data';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Grid,
} from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import AleaImage from '../../assets/Alea_img.png'; 
import { useThemeContext } from '../../context/Themes'; 
import '../../styles/styles.less';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { darkMode, toggleTheme } = useThemeContext(); 

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      navigate('/users');  
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Box padding="20px">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <img src={AleaImage} alt="Alea Logo" className="logo" />
        </Grid>
        <Grid item>
          <IconButton onClick={toggleTheme} color="inherit" style={{ marginLeft: '10px' }} size="large">
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
          <Typography variant="body1" style={{ marginLeft: '1px', marginRight: '50px', display: 'inline' }}>
            {darkMode ? 'Light' : 'Dark'}
          </Typography>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Card className={`card ${darkMode ? 'card-dark' : ''}`}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <form>
              Email
              <TextField
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              Password
              <TextField
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={handleLogin}
                className={darkMode ? 'mui-button-dark' : 'mui-button-primary'}
                fullWidth
                style={{ marginTop: '16px' }}
              >
                Login
              </Button>
            </form>
            {error && (
              <Typography color="error" style={{ marginTop: '16px' }}>
                {error}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default LoginPage;
