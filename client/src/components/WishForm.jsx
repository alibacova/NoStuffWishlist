import React, { useState } from 'react';
import axios from 'axios';

const WishForm = ({ type, setShowEdit, wish }) => {
  const initialWish = wish || {
    username: 'tapushka',
    title: '',
    description: '',
    url: ''
  };

  const [newWish, setWish] = useState(initialWish);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'add') {
      axios.post('/api/wishList/', newWish)
        .then((result) => console.log(result))
        .catch((err) => setError(err));
      setWish(initialWish);
    } else if (type === 'edit') {
      axios.put(`/api/wishList/${wish._id}`, newWish)
        .then((result) => console.log(result))
        .catch((err) => setError(err));
      setShowEdit(false);
    }
    setError(null);
  };

  return (
    <form>
      <h3>{type === 'add' ? 'Add a new wish' : 'Edit wish'}</h3>
      <label>
        Wish title:
      </label>
      <input type='text' value={newWish.title} required={true} onChange={(e) => setWish({...newWish, title: e.target.value})}/>
      <label>
        Wish description:
      </label>
      <input value={newWish.description} required={true} onChange={(e) => setWish({...newWish, description: e.target.value})}/>
      <label>
        Link:
      </label>
      <input value={newWish.url} onChange={(e) => setWish({...newWish, url: e.target.value})}/>
      <button type='submit' onClick={handleSubmit}>Submit</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
}

export default WishForm;