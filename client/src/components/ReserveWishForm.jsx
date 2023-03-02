import React, { useState } from 'react';
import axios from 'axios';

const ReserveWishForm = ({ wish, setIsReserved, setShowReserveForm }) => {
  const initialReserver = {
    reserver_name: '',
    reserver_email: '',
    reserved: true,
  };

  const [reserver, setReserver] = useState(initialReserver);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/wishList/${wish._id}`, reserver)
      .then((result) => {
        console.log(result);
        setIsReserved(true);
      })
      .catch((err) => setError(err));
    setShowReserveForm(false);
    setError(null);
  };

  return (
    <form>
      <label>
        Name:
      </label>
      <input type='text' value={reserver.reserver_name} required={true} onChange={(e) => setReserver({...reserver, reserver_name: e.target.value})}/>
      <label>
        Email:
      </label>
      <input value={reserver.reserver_email} required={true} onChange={(e) => setReserver({...reserver, reserver_email: e.target.value})}/>
      <button type='submit' onClick={handleSubmit}>Submit</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
}

export default ReserveWishForm;