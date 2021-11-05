import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import { AuthRouter } from './Routers/AuthRouter';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <AuthRouter />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
