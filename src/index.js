// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import 'assets/css/bootstrap.min.css';
import 'assets/scss/now-ui-kit.scss?v=1.5.0';
import 'assets/demo/demo.css?v=1.5.0';
import 'assets/demo/nucleo-icons-page-styles.css?v=1.5.0';
import App from './App';
import NucleoIcons from 'views/NucleoIcons.js';
import LandingPage from 'views/examples/LandingPage.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/nucleo-icons" element={<NucleoIcons />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/app/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
