import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Wish from './Wish.jsx';

const WishList = ({ wishList }) => {

  return (
    <div>
      {wishList && wishList.map((wish) => <Wish wish={wish} key={wish._id}/>)}
    </div>
  );
};

export default WishList;