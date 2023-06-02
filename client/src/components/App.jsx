import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Home from '../pages/Home.jsx';
import { Container, Typography } from '@mui/material';
// import SignupForm from './SignupForm.jsx';

const App = () => {

  return (
    <Container sx={{bgcolor: '#FFBE0B', height: '100vh'}}>
      <div className="app">
        <BrowserRouter>
          {/* <Navbar /> */}
          <Typography
            variant='h1'
            align='center'
            sx={{p: 4, color: '#FF006E', fontFamily: 'Tilt Prism'}}
          >
            Non-material Wishlist
          </Typography>
          <div className="pages">
            <Routes>
              <Route path='/' element={<Home />} />
              {/* <Route path='/signup' component={<SignupForm />} /> */}
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </Container>
  );
};

export default App;
