import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './views/LoginPage/LoginPage';
import UsersPage from './views/UsersPage/UsersPage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import { ThemeContextProvider } from './context/Themes';

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <Router basename="/Alea-Test">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
};

export default App;
