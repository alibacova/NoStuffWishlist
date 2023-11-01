import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        email: action.payload,
      };
    case "SIGN_UP":
      return {
        email: action.payload,
      };
    case "SIGN_OUT":
      return {
        email: null,
      };
    default:
      return state;
  }
  throw Error(`Unknown action: ${action.type}`);
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { email: null });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
