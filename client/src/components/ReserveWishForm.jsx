import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormControl, InputLabel, IconButton, OutlinedInput, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ReserveWishForm = ({ wish, setIsReserved, setShowReserveForm, showReserveForm }) => {
  const initialReserver = {
    reserver_name: '',
    reserver_email: '',
    reserved: true,
  };

  const [reserver, setReserver] = useState(initialReserver);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reserver.reserver_name && reserver.reserver_email) {
      axios.put(`/api/wishList/${wish._id}`, reserver)
        .then((result) => {
          console.log(result);
          setIsReserved(true);
        })
        .catch((err) => setError(err));
      setShowReserveForm(false);
      setError(null);
    } else {
      setError('Please fill in both fields');
    }
  };

  return (
    <Grid
      container
      // spacing={0.5}
      component='form'
      // alignItems='center'
      justifyContent='center'
    >
      <Grid item xs={6}>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Name</InputLabel>
          <OutlinedInput
            id="component-outlined"
            label="Name"
            value={reserver.reserver_name}
            required={true}
            onChange={(e) => setReserver({...reserver, reserver_name: e.target.value})}
            sx={{color: 'primary.main', m: 1}}
            size='small'
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Email</InputLabel>
          <OutlinedInput
            id="component-outlined"
            label="Email"
            value={reserver.reserver_email}
            required={true}
            onChange={(e) => setReserver({...reserver, reserver_email: e.target.value})}
            sx={{color: 'primary.main', m: 1}}
            size='small'
          />
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <Button
          size='small'
          variant='outlined'
          type='submit'
          onClick={handleSubmit}
        >
            Reserve
        </Button>
        </Grid>
        {/* <Grid item xs={1}>
        <IconButton
          size='small'
          variant='outlined'
          onClick={() => setShowReserveForm(!showReserveForm)}
        >
          <CloseIcon />
        </IconButton>

      </Grid> */}
      {error && <div className='error'>{error}</div>}
    </Grid>
  );
}

export default ReserveWishForm;