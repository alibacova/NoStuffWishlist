import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { WishListContextProvider } from "./context/WishListContext.js";
import { AuthContextProvider } from "./context/AuthContext.js";
import Theme from "./theme.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <ThemeProvider theme={Theme}>
    <CssBaseline />
    <AuthContextProvider>
      <WishListContextProvider>
        <App />
      </WishListContextProvider>
    </AuthContextProvider>
  </ThemeProvider>,
);
