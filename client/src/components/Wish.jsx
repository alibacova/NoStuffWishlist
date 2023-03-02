import React, { useState, useEffect } from 'react';
import { useWishListContext } from '../hooks/useWishListContext.jsx';
import axios from 'axios';
import WishForm from './WishForm.jsx';
import ReserveWishForm from './ReserveWishForm.jsx';
import { Button, Typography, Card, Paper, Grid, IconButton, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Wish = ({ wish }) => {
  const { dispatch } = useWishListContext();

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isReserved, setIsReserved] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showReserveForm, setShowReserveForm] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`/api/wishList/${wish._id}`)
      .then((result) => dispatch({type: 'DELETE_WISH', payload: result.data}))
      .catch((err) => setError(err));
    setError(null);
  };

  return (
    <Paper sx={{my: 4, p: 3}}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography variant='h6' sx={{my: 1, color: '#0EAD69'}} onClick={() => setIsOpen(!isOpen)}>{wish.title}</Typography>
          {isOpen &&
            <>
              <Typography variant='body1' sx={{px: 1, my: 1, color: '#EE4266'}}>{wish.description}</Typography>
              <Typography variant='body1' sx={{px: 1, my: 1, color: '#EE4266'}}>{wish.url ? wish.url : ''}</Typography>
            </>
          }
          {showEdit && <WishForm wish={wish} type='edit' setShowEdit={setShowEdit}/>}
        </Grid>
        <Grid item xs={2}>
          {/* <button onClick={handleDelete}>Delete</button> */}
          {/* <Button variant='contained' onClick={handleDelete}>Delete</Button> */}
          <IconButton aria-label="edit" size='small' onClick={() => setShowEdit(!showEdit)}>
            <EditIcon sx={{color: '#0EAD69'}}/>
          </IconButton>
          <IconButton aria-label="delete" size='small' onClick={handleDelete}>
            <DeleteIcon sx={{color: '#EE4266'}}/>
          </IconButton>
          {/* <Button variant='outlined' onClick={() => setShowEdit(!showEdit)}>Edit</Button>
           */}

          <Button variant='outlined' onClick={() => {if (!wish.reserved) {
            setShowReserveForm(!showReserveForm)
          }}}>
            {wish.reserved ? 'Promised' : 'Promise'}
          </Button>
          {showReserveForm && <ReserveWishForm wish={wish} setIsReserved={setIsReserved} setShowReserveForm={setShowReserveForm}/>}
        </Grid>

      </Grid>
    </Paper>
  );
};

export default Wish;