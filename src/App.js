import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import './styles.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('user'))
  );

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(user)); 
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user'); 
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/account" /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/account"
          element={isAuthenticated ? <AccountPage onLogout={handleLogout} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
