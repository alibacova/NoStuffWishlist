import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Stack, Paper } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext.js";
import FormInput from "./FormInput.jsx";

const SignupForm = () => {
  const initialUserInfo = {
    email: "",
    password: "",
    passwordConf: "",
  };
  const { dispatch } = useAuthContext();

  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (userInfo.password !== userInfo.passwordConf) {
      return setError("Passwords do not match");
    }
    setError(null);
    setLoading(true);
    await signup(userInfo);
  }

  function signup(userInfo) {
    axios
      .post("/api/user/signup", userInfo)
      .then((result) => {
        console.log(result);
        setUserInfo(initialUserInfo);
        setLoading(false);
        setError(null);
        dispatch({ type: "SIGN_UP", payload: result.data });
        localStorage.setItem("user", JSON.stringify(result.data));
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setError(err.response.data.error);
      });
  }

  // TODO: add conditional rendering for loading
  return (
    <Paper component="form">
      <Stack spacing={1} sx={{ p: 2, bgcolor: "#FEE7DC" }}>
        <Typography variant="h3" sx={{ my: 1, color: "black" }}>
          SIGN UP
        </Typography>
        <FormInput
          error={error}
          helperText={error}
          id="user-email"
          isRequired={true}
          label="Email"
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          value={userInfo.email}
        />
        <FormInput
          error={error}
          helperText={error}
          id="user-password"
          isRequired={true}
          label="Password"
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
          value={userInfo.password}
        />
        <FormInput
          error={error}
          helperText={error}
          id="user-password-confirmation"
          isRequired={true}
          label="Password Confirmation"
          onChange={(e) =>
            setUserInfo({ ...userInfo, passwordConf: e.target.value })
          }
          value={userInfo.passwordConf}
        />
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          {/* need to add disabled property for when the status isLoading is true */}
          Sign up
        </Button>
        {error && <div className="error">{error}</div>}
      </Stack>
    </Paper>
  );
};

export default SignupForm;
