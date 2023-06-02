import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import { WishListContextProvider } from './context/WishListContext.jsx';
import Theme from './theme.jsx';
import { ThemeProvider, CssBaseline } from '@mui/material';

// import { AuthContextProvider } from './context/AuthContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  // <AuthContextProvider>
  <ThemeProvider theme={Theme}>
    <CssBaseline />
    <WishListContextProvider>
      <App />
    </WishListContextProvider>
  </ThemeProvider>
  // </AuthContextProvider>
);
