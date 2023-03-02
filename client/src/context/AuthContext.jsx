// import { createContext, useContext, useState, useEffect } from 'react';
// import { auth } from '../firebase.jsx';

// export const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthContextProvider = ({ children }) => {
//   const [currUser, setCurrUser] = useState();
//   const [loading, setLoading] = useState(true);

//   function signup(email, password) {
//     return auth.createUserWithEmailAndPassword(email, password);
//   };

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       setCurrUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   const value = {
//     currUser,
//     signup
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };