import React, { useState, useEffect } from 'react';
import { useWishListContext } from '../hooks/useWishListContext.jsx';
import axios from 'axios';
import Wish from './Wish.jsx';
import { Typography, Button, Tabs, Tab } from '@mui/material';

const WishList = ({ wishList }) => {
  const [filter, setFilter] = useState('');
  const handleFilter = (condition) => {
    wishList.filter((wish) => condition(wish));
  };
  const { dispatch } = useWishListContext();

  return (
    <div>
      {/* <Tabs value={value} onChange={} aria-label='wishlist filter tabs'>
        <Tab label='All wishes' />
        <Tab>
          Reserved wishes
        </Tab>
        <Tab>
          Non-reserved wishes
        </Tab>

      </Tabs> */}
      {wishList &&
      <>
      <Typography variant='h2' align='center' sx={{py: 2, color: '#A53603', fontWeight: 'bold'}}>
        Wishes
      </Typography>
      {wishList.map((wish) => <Wish wish={wish} key={wish._id}/>)}
      </>
      }
    </div>
  );
};

export default WishList;