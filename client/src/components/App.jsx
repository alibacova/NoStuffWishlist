import React, { useState, useEffect } from "react";
import { HashRouter, Navigate, Routes, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Home from "../pages/Home.jsx";
import { Container, Typography } from "@mui/material";
import Signup from "../pages/Signup.jsx";
import LoginForm from "./LoginForm.jsx";
import { useAuthContext } from "../hooks/useAuthContext.js";

const App = () => {
  const { user } = useAuthContext();
  return (
    <Container sx={{ bgcolor: "#FFBE0B", height: "100vh" }}>
      <div className="app">
        <HashRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route
                exact
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={!user ? <LoginForm /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
        </HashRouter>
      </div>
    </Container>
  );
};

export default App;
