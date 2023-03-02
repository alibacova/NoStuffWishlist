import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Home from '../pages/Home.jsx';
import { Container, Typography } from '@mui/material';
// import SignupForm from './SignupForm.jsx';

const App = () => {

  return (
    <div className="app">
      <BrowserRouter>
        <Container sx={{bgcolor: '#3BCEAC', height: '100vh'}}>
          <Navbar />
          <Typography variant='h3' sx={{my: 4, color: 'primary.main'}}>Alex's Wishlist</Typography>
          <div className="pages">
            <Routes>
              <Route path='/' element={<Home />} />
              {/* <Route path='/signup' component={<SignupForm />} /> */}
            </Routes>
          </div>
        </Container>
      </BrowserRouter>
    </div>
  );
};

export default App;
