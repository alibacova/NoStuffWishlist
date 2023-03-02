import React, { useEffect } from 'react';
import { useWishListContext } from '../hooks/useWishListContext.jsx';
import axios from 'axios';
import WishList from '../components/WishList.jsx';
import WishForm from '../components/WishForm.jsx';

const Home = () => {
  const {wishList, dispatch} = useWishListContext();

  useEffect(() => {
    axios.get('/api/wishList')
      .then((result) => dispatch({type: 'SET_WISHLIST', payload: result.data}))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <WishList wishList={wishList}/>
      <WishForm type='add' />
    </div>
  );
};

export default Home;
