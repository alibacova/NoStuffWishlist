import React, { useState } from 'react';
import axios from 'axios';

const AddWishForm = () => {
  const initialWish = {
    username: 'tapushka',
    title: '',
    description: '',
    url: ''
  };

  const [newWish, setNewWish] = useState(initialWish);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/wishList/', newWish)
      .then((result) => console.log(result))
      .catch((err) => setError(err));
    setNewWish(initialWish);
    setError(null);
  };

  return (
    <form>
      <label>
        Add wish title
      </label>
      <input type='text' value={newWish.title} required={true} onChange={(e) => setNewWish({...newWish, title: e.target.value})}/>
      <label>
        Add wish description
      </label>
      <input value={newWish.description} required={true} onChange={(e) => setNewWish({...newWish, description: e.target.value})}/>
      <label>
        Add url
      </label>
      <input value={newWish.url} onChange={(e) => setNewWish({...newWish, url: e.target.value})}/>
      <button type='submit' onClick={handleSubmit}>Submit</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
}

export default AddWishForm;