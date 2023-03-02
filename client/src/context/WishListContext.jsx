import { createContext, useReducer } from 'react';

export const WishListContext = createContext();

export const wishListReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WISHLIST' :
      return {
        wishList: action.payload
      }
    case 'CREATE_WISH' :
      return {
        wishList: [action.payload, ...state.wishList]
      }
    case 'UPDATE_WISH' :
      return {
        wishList: [action.payload, ...state.wishList]
      }
    case 'DELETE_WISH' :
      return {

      }
    default :
      return state;
  }
};

export const WishListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishListReducer, {
    wishList: null,
  });

  return (
    <WishListContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WishListContext.Provider>
  );
};