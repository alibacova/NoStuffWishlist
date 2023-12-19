import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Stack, Paper } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext.js";
import FormInput from "./FormInput.jsx";
import { noErrorObject } from "../utils/constants.js";

const SignupForm = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const initialUserInfo = {
    email: "",
    password: "",
    passwordConf: "",
  };
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [error, setError] = useState(noErrorObject);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!userInfo.email || !userInfo.password || !userInfo.passwordConf) {
      return setError({
        ...error,
        general: {
          isValid: false,
          message: "Please fill out all the fields",
        },
      });
    }
    if (userInfo.password !== userInfo.passwordConf) {
      return setError({
        ...error,
        password: {
          isValid: false,
          message: "Passwords do not match",
        },
      });
    }
    setLoading(true);
    await signup(userInfo);
  }

  const onSuccess = (result) => {
    setLoading(false);
    setError(noErrorObject);
    dispatch({ type: "SIGN_UP", payload: result.data });
    localStorage.setItem("user", JSON.stringify(result.data));
    navigate("/");
  };

  const onError = (err) => {
    setLoading(false);
    setError({
      ...error,
      general: {
        isValid: false,
        message: err.response.data.error,
      },
    });
  };

  function signup(userInfo) {
    axios
      .post("/api/user/signup", userInfo)
      .then((result) => onSuccess(result))
      .catch((err) => onError(err));
  }

  // TODO: add conditional rendering for loading
  return (
    <Paper component="form">
      <Stack spacing={1} sx={{ p: 2, bgcolor: "#FEE7DC" }}>
        <Typography variant="h3" sx={{ my: 1, color: "black" }}>
          SIGN UP
        </Typography>
        <FormInput
          error={!error.email.isValid || !error.general.isValid}
          helperText={error.email.message}
          id="user-email"
          isRequired={true}
          label="Email"
          onChange={(e) => {
            if (error !== noErrorObject) {
              setError(noErrorObject);
            }
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
          value={userInfo.email}
        />
        <FormInput
          error={!error.general.isValid}
          id="user-password"
          isRequired={true}
          label="Password"
          onChange={(e) => {
            if (error !== noErrorObject) {
              setError(noErrorObject);
            }
            setUserInfo({ ...userInfo, password: e.target.value });
          }}
          value={userInfo.password}
        />
        <FormInput
          error={!error.password.isValid || !error.general.isValid}
          helperText={error.password.message}
          id="user-password-confirmation"
          isRequired={true}
          label="Password Confirmation"
          onChange={(e) => {
            if (error !== noErrorObject) {
              setError(noErrorObject);
            }
            setUserInfo({ ...userInfo, passwordConf: e.target.value });
          }}
          value={userInfo.passwordConf}
        />
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          {/* need to add disabled property for when the status isLoading is true */}
          Sign up
        </Button>
        {!error.general.isValid && <div>{error.general.message}</div>}
      </Stack>
    </Paper>
  );
};

export default SignupForm;
