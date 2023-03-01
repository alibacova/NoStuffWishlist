import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Home from '../pages/Home.jsx';

const App = () => {

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <h1>Alex's Wishlist</h1>
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
