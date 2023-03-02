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
        wishList: state.wishList.map((wish) => {
          return wish._id === action.payload._id ? action.payload : wish;
        })
      }
    case 'DELETE_WISH' :
      return {
        wishList: state.wishList.filter((wish) => wish._id !== action.payload._id)
      }
    default :
      return state;
  }
  throw Error("unknown action: ", + action.type);
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