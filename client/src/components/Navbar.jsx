import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import LoginForm from './LoginForm.jsx';

const Navbar = () => {

  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1>Wishlist</h1>
        </Link>
      </div>
      <button>Login</button>

    </header>
  );
};

export default Navbar;