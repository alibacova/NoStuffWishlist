// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext.jsx';

// const SignupForm = () => {
//   const initialUserInfo = {
//     email: '',
//     password: '',
//     passwordConf: '',
//   };

//   const [userInfo, setUserInfo] = useState(initialUserInfo);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { signup } = useAuth();

//   async function handleSubmit (e) {
//     e.preventDefault();
//     if (userInfo.password !== userInfo.passwordConf) {
//       return setError('Passwords do not match');
//     }
//     try {
//       setError(null);
//       setLoading(true);
//       await signup(userInfo);
//     } catch {
//       setError('Could not create an account');
//     }
//     axios.post('/api/user/signup', userInfo)
//       .then((result) => console.log(result))
//       .catch((err) => setError(err));
//     setUserInfo(initialUserInfo);
//     setLoading(false);
//   };

//   return (
//     <form>
//       <label>
//         Email
//       </label>
//       <input type='text' value={userInfo.email} required={true} onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}/>
//       <label>
//         Password
//       </label>
//       <input value={userInfo.password} required={true} onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}/>
//       <label>
//         Password Confirmation
//       </label>
//       <input value={userInfo.passwordConf} required={true} onChange={(e) => setUserInfo({...userInfo, passwordConf: e.target.value})}/>
//       <button type='submit' onClick={handleSubmit}>Sign up</button>
//       {error && <div className='error'>{error}</div>}
//     </form>
//   );
// }

// export default SignupForm;