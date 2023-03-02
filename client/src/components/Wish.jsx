import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WishForm from './WishForm.jsx';
import ReserveWishForm from './ReserveWishForm.jsx';

const Wish = ({ wish }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isReserved, setIsReserved] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showReserveForm, setShowReserveForm] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`/api/wishList/${wish._id}`)
      .then((result) => console.log(result))
      .catch((err) => setError(err));
    setError(null);
  };

  return (
    <div>
      <h4 onClick={() => setIsOpen(!isOpen)}>{wish.title}</h4>
      {isOpen &&
        <>
          <p>{wish.description}</p>
          <p>{wish.url ? wish.url : ''}</p>
        </>
      }
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => setShowEdit(!showEdit)}>Edit</button>
      {showEdit && <WishForm wish={wish} type='edit' setShowEdit={setShowEdit}/>}
      <button onClick={() => {if (!wish.reserved) {
        setShowReserveForm(!showReserveForm)
      }}}>
        {wish.reserved ? 'Reserved' : 'Reserve'}
      </button>
      {showReserveForm && <ReserveWishForm wish={wish} setIsReserved={setIsReserved} setShowReserveForm={setShowReserveForm}/>}
    </div>
  );
};

export default Wish;