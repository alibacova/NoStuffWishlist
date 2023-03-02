import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
// import LoginForm from './LoginForm.jsx';

const Navbar = () => {

  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <Typography variant='h4'>Wishlist</Typography>
        </Link>
      </div>
      <Button>Login</Button>

    </header>
  );
};

export default Navbar;