// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './Core/Routes/appRoutes';
import './index.css';
import { Toaster } from 'sonner';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Core/context/UserContext'; // 👈 Asegúrate de que el archivo exista

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Toaster position="top-center" richColors />
        <AppRoutes />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
