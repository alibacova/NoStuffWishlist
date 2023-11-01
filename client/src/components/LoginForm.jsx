import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  TextField,
  Card,
  Grid,
  Box,
  OutlinedInput,
  FormControl,
  InputLabel,
  Stack,
  Paper,
} from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext.js";

const LoginForm = () => {
  const initialLoginInfo = {
    email: "",
    password: "",
  };

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState(initialLoginInfo);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    await login(loginInfo);
  }

  function login(loginInfo) {
    axios
      .post("/api/user/login", loginInfo)
      .then((result) => {
        console.log(result);
        setLoginInfo(initialLoginInfo);
        setLoading(false);
        setError(null);
        dispatch({ type: "SIGN_IN", payload: result.data });
        localStorage.setItem("user", JSON.stringify(result.data));
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setError(err.response.data.error);
      });
  }

  return (
    <Paper component="form">
      <Stack spacing={1} sx={{ p: 2, bgcolor: "#FEE7DC" }}>
        <>
          <Typography variant="h3" sx={{ my: 1, color: "black" }}>
            LOG IN
          </Typography>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Email</InputLabel>
            <OutlinedInput
              id="component-outlined"
              label="Email"
              value={loginInfo.email}
              required={true}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, email: e.target.value })
              }
              sx={{ color: "primary.main" }}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Password</InputLabel>
            <OutlinedInput
              id="component-outlined"
              label="Password"
              value={loginInfo.password}
              required={true}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
              sx={{ color: "primary.main" }}
            />
          </FormControl>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Log in
          </Button>
          {error && <div className="error">{error}</div>}
        </>
      </Stack>
    </Paper>
  );
};

export default LoginForm;
