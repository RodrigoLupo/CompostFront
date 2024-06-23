import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Providers from './components/Providers';
import Clients from './components/Clients';
import Products from './components/Products';
import Sales from './components/Sales';
import Exchanges from './components/Exchanges';
import Kilos from './components/Kilos';
import WeatherWidget from './components/WeatherWidget'; // Importa el componente WeatherWidget
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  const handleLogin = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <div className="app">
      {isLoggedIn && <Navbar />}
      <div className="main">
        {isLoggedIn && <Sidebar />}
        <div className={`content ${isLoggedIn ? 'dashboard-content' : ''}`}>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/404" element={<div>404 - Page Not Found</div>} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Routes>
                    <Route path="home" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="providers" element={<Providers />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="products" element={<Products />} />
                    <Route path="sales" element={<Sales />} />
                    <Route path="exchanges" element={<Exchanges />} />
                    <Route path="kilos" element={<Kilos />} />
                    <Route path="monitoreo" element={<WeatherWidget />} /> {/* Nueva ruta */}
                    <Route path="*" element={<Navigate to="/404" />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard/home" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
