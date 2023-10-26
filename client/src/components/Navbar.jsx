import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';

const Navbar = () => {

  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <Typography
            variant='h6'
            align='center'
            sx={{p: 4, color: '#FF006E', fontFamily: 'Tilt Prism'}}
          >
            Non-material Wishlist
          </Typography>
        </Link>
        <NavLink to='/login' element={<LoginForm />}>
          Login
        </NavLink>
        <NavLink to='/signup' component={<SignupForm />}>
          SignUp
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;