import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Typography, AppBar, Toolbar, Box } from "@mui/material";
import LoginForm from "./LoginForm.jsx";
import Signup from "../pages/Signup.jsx";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useWishListContext } from "../hooks/useWishListContext.js";

const Navbar = () => {
  const { user, dispatch } = useAuthContext();
  const wishListDispatch = useWishListContext().dispatch;
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch({ type: "SIGN_OUT" });
    wishListDispatch({ type: "SET_WISHLIST", payload: null });
    localStorage.removeItem("user");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          align="left"
          noWrap
          component={Link}
          to="/"
          sx={{
            p: 4,
            color: "#FF006E",
            fontFamily: "Tilt Prism",
            textDecoration: "none",
            flexGrow: 1,
          }}
        >
          Non-material Wishlist
        </Typography>
        {user ? (
          <Button
            variant="text"
            color="secondary"
            type="submit"
            onClick={handleSubmit}
            sx={{ mr: 5, whiteSpace: "nowrap" }}
          >
            Log out
          </Button>
        ) : (
          <Box sx={{ mr: 5 }}>
            <Button
              variant="text"
              color="secondary"
              component={NavLink}
              to="/login"
              element={<LoginForm />}
              sx={{ whiteSpace: "nowrap" }}
            >
              Log In
            </Button>
            <Button
              variant="text"
              color="secondary"
              component={NavLink}
              to="/signup"
              element={<Signup />}
              sx={{ whiteSpace: "nowrap" }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
