import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const initialForm = {
    username: 'tapushka',
    email: '',
    password: '',
  };

  const [login, setLogin] = useState(initialForm);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', login)
      .then((result) => console.log(result))
      .catch((err) => setError(err));
    setLogin(initialForm);
    setError(null);
  };

  return (
    <form>
      <label>
        email
      </label>
      <input type='text' value={login.email} required={true} onChange={(e) => setLogin({...login, email: e.target.value})}/>
      <label>
        password
      </label>
      <input value={login.password} required={true} onChange={(e) => setLogin({...login, password: e.target.value})}/>
      <button type='submit' onClick={handleSubmit}>Login</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
}

export default LoginForm;