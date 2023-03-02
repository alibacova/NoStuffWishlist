import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { WishListContextProvider } from './context/WishListContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <WishListContextProvider>
    <App />
  </WishListContextProvider>
);
