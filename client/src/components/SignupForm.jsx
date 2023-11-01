import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  OutlinedInput,
  FormControl,
  InputLabel,
  Stack,
  Paper,
} from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext.js";

const SignupForm = () => {
  const initialUserInfo = {
    email: "",
    password: "",
    passwordConf: "",
  };
  const { user, dispatch } = useAuthContext();

  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (userInfo.password !== userInfo.passwordConf) {
      return setError("Passwords do not match");
    }
    try {
      setError(null);
      setLoading(true);
      const user = await signup(userInfo);
    } catch {
      setError("Could not create an account");
    }
    setUserInfo(initialUserInfo);
    setLoading(false);
  }

  async function signup(userInfo) {
    axios
      .post("/api/user/signup", userInfo)
      .then((result) => {
        console.log(result);
        setUserInfo(initialUserInfo);
        setLoading(false);
        setError(null);
        dispatch({ type: "SIGN_UP", payload: result.data.email });
        navigate("/");
      })
      .catch((err) => {
        setError(err);
        setUserInfo(initialUserInfo);
      });
  }

  return (
    <Paper component="form">
      <Stack spacing={1} sx={{ p: 2, bgcolor: "#FEE7DC" }}>
        <>
          <Typography variant="h3" sx={{ my: 1, color: "black" }}>
            SIGN UP
          </Typography>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Email</InputLabel>
            <OutlinedInput
              id="component-outlined"
              label="Email"
              value={userInfo.email}
              required={true}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              sx={{ color: "primary.main" }}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Password</InputLabel>
            <OutlinedInput
              id="component-outlined"
              label="Password"
              value={userInfo.password}
              required={true}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              sx={{ color: "primary.main" }}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-outlined">
              Password Confirmation
            </InputLabel>
            <OutlinedInput
              id="component-outlined"
              label="Password Confirmation"
              value={userInfo.passwordConf}
              required={true}
              onChange={(e) =>
                setUserInfo({ ...userInfo, passwordConf: e.target.value })
              }
              sx={{ color: "primary.main" }}
            />
          </FormControl>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Sign up
          </Button>
          {error && <div className="error">{error}</div>}
        </>
      </Stack>
    </Paper>
  );
};

export default SignupForm;
