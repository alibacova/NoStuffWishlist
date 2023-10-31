import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, TextField, Card, Grid, Box, OutlinedInput, FormControl, InputLabel, Stack, Paper } from '@mui/material';

const LoginForm = () => {
  const initialForm = {
    username: 'tapushka',
    email: '',
    password: '',
  };

  const { dispatch } = useWishListContext();
  const [login, setLogin] = useState(initialForm);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', login)
      .then((result) => console.log(result))
      .catch((err) => setError(err));
    setLogin(initialForm);
    setError(null);
  };

  return (
    <Paper component='form'>
      <Stack spacing={1} sx={{p: 2, bgcolor: '#FEE7DC'}}>
        <>
          <Typography variant='h3' sx={{my: 1, color: 'black'}}>
            LOGIN
          </Typography>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Email</InputLabel>
            <OutlinedInput
              id="component-outlined"
              label="Email"
              value={login.email}
              required={true}
              onChange={(e) => setLogin({...login, email: e.target.value})}
              sx={{color: 'primary.main'}}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Password</InputLabel>
            <OutlinedInput
              id="component-outlined"
              label="Password"
              value={login.password}
              required={true}
              onChange={(e) => setLogin({...login, password: e.target.value})}
              sx={{color: 'primary.main'}}
            />
          </FormControl>
          <Button
            variant='contained'
            type='submit'
            onClick={handleSubmit}
          >
            Login
          </Button>
          {error && <div className='error'>{error}</div>}
        </>
      </Stack>
    </Paper>
  );
}

export default LoginForm;