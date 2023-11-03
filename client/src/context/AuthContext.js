import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        user: action.payload,
      };
    case "SIGN_UP":
      return {
        user: action.payload,
      };
    case "SIGN_OUT":
      return {
        user: null,
      };
    default:
      return state;
  }
  throw Error(`Unknown action: ${action.type}`);
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: JSON.parse(localStorage.getItem("user")),
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
