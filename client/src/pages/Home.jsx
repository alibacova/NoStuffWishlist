import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WishList from '../components/WishList.jsx';
import AddWishForm from '../components/AddWishForm.jsx';

const Home = () => {
  const [wishList, setWishList] = useState(null);

  useEffect(() => {
    axios.get('/api/wishList')
      .then((result) => setWishList(result.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <WishList wishList={wishList}/>
      <AddWishForm />
    </div>
  );
};

export default Home;
