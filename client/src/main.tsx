import {ThemeProvider} from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
