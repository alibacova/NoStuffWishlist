import React, { useState } from 'react';
import { useWishListContext } from '../hooks/useWishListContext.jsx';
import axios from 'axios';
import { Button, Typography, TextField, Card, Grid, Box, OutlinedInput, FormControl, InputLabel, Stack, Paper } from '@mui/material';

const WishForm = ({ type, setShowEdit, wish }) => {
  const initialWish = wish || {
    username: 'tapushka',
    title: '',
    description: '',
    url: ''
  };

  const { dispatch } = useWishListContext();
  const [newWish, setWish] = useState(initialWish);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'add') {
      axios.post('/api/wishList/', newWish)
        .then((result) => dispatch({type: 'CREATE_WISH', payload: result.data}))
        .catch((err) => setError(err));
      setWish(initialWish);
    } else if (type === 'edit') {
      axios.put(`/api/wishList/${wish._id}`, newWish)
        .then((result) => {
          console.log('result ', result);
          dispatch({type: 'UPDATE_WISH', payload: result.data})})
        .catch((err) => setError(err));
      setShowEdit(false);
    }
    setError(null);
  };

  return (
    <Paper component='form'>
      <Stack spacing={1} sx={{p: 2, bgcolor: '#FEE7DC'}}>
        <Typography variant='h3' sx={{my: 1, color: 'primary.main'}} onClick={() => setIsOpen(!isOpen)}>
          {type === 'add' ? '+ Add a new wish' : 'Edit wish'}
        </Typography>
        {isOpen &&
        <>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Title</InputLabel>
            <OutlinedInput
              id="component-outlined"
              label="Title"
              value={newWish.title}
              required={true}
              onChange={(e) => setWish({...newWish, title: e.target.value})}
              sx={{color: 'primary.main'}}
            />
          </FormControl>
          <FormControl>
            <TextField
              multiline
              id="outlined-multiline-flexible"
              label="Description"
              value={newWish.description}
              required={true}
              onChange={(e) => setWish({...newWish, description: e.target.value})}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Link</InputLabel>
            <OutlinedInput
              id="component-outlined"
              label="Link"
              value={newWish.url}
              onChange={(e) => setWish({...newWish, url: e.target.value})}
            />
          </FormControl>
          <Button
            variant='contained'
            type='submit'
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {error && <div className='error'>{error}</div>}
        </>}
      </Stack>
  </Paper>
  );
}

export default WishForm;