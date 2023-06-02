import React, { useState, useEffect } from 'react';
import { useWishListContext } from '../hooks/useWishListContext.jsx';
import axios from 'axios';
import WishForm from './WishForm.jsx';
import ReserveWishForm from './ReserveWishForm.jsx';
import { Button, Typography, Card, Paper, Grid, IconButton, Link} from '@mui/material';
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
    <Paper sx={{my: 4, p: 3, bgcolor: '#FEE7DC'}}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Typography variant='h6' sx={{my: 1, color: '#3A86FF'}} onClick={() => setIsOpen(!isOpen)}>{wish.title}</Typography>
          {isOpen &&
            <>
              <Typography variant='body1' sx={{my: 1}}>{wish.description}</Typography>
              <Link variant='body1' href="#" sx={{my: 1, color: '#FF006E'}}>{wish.url ? wish.url : ''}</Link>
            </>
          }
          {showEdit && <WishForm wish={wish} type='edit' setShowEdit={setShowEdit}/>}
          {showReserveForm && <ReserveWishForm wish={wish} setIsReserved={setIsReserved} setShowReserveForm={setShowReserveForm}/>}
        </Grid>
        <Grid item xs={2}>
          <Button variant='outlined' onClick={() => {if (!wish.reserved) {
            setShowReserveForm(!showReserveForm)
          }}}>
            {wish.reserved || isReserved ? 'Reserved' : 'Reserve'}
          </Button>
          {/* {showReserveForm && <ReserveWishForm wish={wish} setIsReserved={setIsReserved} setShowReserveForm={setShowReserveForm} showReserveForm={showReserveForm}/>} */}
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="edit" size='small' onClick={() => setShowEdit(!showEdit)}>
            <EditIcon sx={{color: '#3A86FF'}}/>
          </IconButton>
          <IconButton aria-label="delete" size='small' onClick={handleDelete}>
            <DeleteIcon sx={{color: '#FB5607'}}/>
          </IconButton>
        </Grid>

      </Grid>
    </Paper>
  );
};

export default Wish;