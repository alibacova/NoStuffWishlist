import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
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
    <header>
      <div className="container">
        <Link to="/">
          <Typography
            variant="h6"
            align="center"
            sx={{ p: 4, color: "#FF006E", fontFamily: "Tilt Prism" }}
          >
            Non-material Wishlist
          </Typography>
        </Link>
        <nav>
          {user ? (
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Log out
            </Button>
          ) : (
            <>
              <NavLink to="/login" element={<LoginForm />}>
                Log In
              </NavLink>
              <NavLink to="/signup" component={<Signup />}>
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
