import React, {
  useState,
  useEffect,
} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Switch,
} from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Home from '../pages/Home.jsx';
import {
  Container,
  Typography,
} from '@mui/material';
import SignupForm from './SignupForm.jsx';
import LoginForm from './LoginForm.jsx';

const App = () => {

  return (
    <Container sx={{bgcolor: '#FFBE0B', height: '100vh'}}>
      <div className="app">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/signup' element={<SignupForm />} />
              <Route path='/login' element={<LoginForm />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </Container>
  );
};

export default App;
