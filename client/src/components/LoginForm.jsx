import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Stack, Paper } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext.js";
import FormInput from "./FormInput.jsx";

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
    if (!loginInfo.email || !loginInfo.password) {
      return setError("Please fill out both email and password fields");
    }
    setLoading(true);
    await login(loginInfo);
  }

  function login(loginInfo) {
    axios
      .post("/api/user/login", loginInfo)
      .then((result) => onSuccess(result))
      .catch((err) => onError(err));
  }

  const onSuccess = (result) => {
    setLoading(false);
    setError(null);
    dispatch({ type: "SIGN_IN", payload: result.data });
    localStorage.setItem("user", JSON.stringify(result.data));
    navigate("/");
  };

  const onError = (err) => {
    setLoading(false);
    setError(err.response.data.error);
  };

  return (
    <Paper component="form">
      <Stack spacing={1} sx={{ p: 2, bgcolor: "#FEE7DC" }}>
        <Typography variant="h3" sx={{ my: 1, color: "black" }}>
          LOG IN
        </Typography>
        <FormInput
          error={error !== null}
          helperText={error}
          id="user-email"
          isRequired={true}
          label="Email"
          onChange={(e) => {
            if (error) {
              setError(null);
            }
            setLoginInfo({ ...loginInfo, email: e.target.value });
          }}
          value={loginInfo.email}
        />
        <FormInput
          error={error !== null}
          helperText={error}
          id="user-password"
          isRequired={true}
          label="Password"
          onChange={(e) => {
            if (error) {
              setError(null);
            }
            setLoginInfo({ ...loginInfo, password: e.target.value });
          }}
          value={loginInfo.password}
        />
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Log in
        </Button>
        {error && <div className="error">{error}</div>}
      </Stack>
    </Paper>
  );
};

export default LoginForm;
