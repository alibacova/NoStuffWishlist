import React, { useState } from "react";
import { useWishListContext } from "../hooks/useWishListContext.js";
import { useAuthContext } from "../hooks/useAuthContext.js";
import axios from "axios";
import { Button, Stack, Paper, Container } from "@mui/material";
import FormInput from "./FormInput.jsx";

const WishForm = ({ setShowEdit, type, wish }) => {
  const { user } = useAuthContext();
  const { dispatch } = useWishListContext();

  const initialWish = wish || {
    title: "",
    description: "",
    url: "",
  };

  const [newWish, setWish] = useState(initialWish);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in!");
      return;
    }
    if (type === "add") {
      axios
        .post("/api/wishList/", newWish, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((result) =>
          dispatch({ type: "CREATE_WISH", payload: result.data }),
        )
        .catch((err) => setError(err));
      setWish(initialWish);
    } else if (type === "edit") {
      axios
        .put(`/api/wishList/${wish._id}`, newWish, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((result) => {
          console.log("result ", result);
          dispatch({ type: "UPDATE_WISH", payload: result.data });
        })
        .catch((err) => setError(err));
      setShowEdit(false);
    }
    setError(null);
  };

  return (
    <Container>
      <Paper component="form">
        <Stack spacing={1} sx={{ p: 2, bgcolor: "#FEE7DC" }}>
          <FormInput
            id="wish-title"
            isRequired={true}
            label="Title"
            onChange={(e) => setWish({ ...newWish, title: e.target.value })}
            value={newWish.title}
          />
          <FormInput
            id="wish-description"
            value={newWish.description}
            isMultiline={true}
            label="Description"
            onChange={(e) =>
              setWish({ ...newWish, description: e.target.value })
            }
          />
          <FormInput
            id="wish-link"
            value={newWish.url}
            label="Link"
            onChange={(e) => setWish({ ...newWish, url: e.target.value })}
          />
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          {error && <div className="error">{error}</div>}
        </Stack>
      </Paper>
    </Container>
  );
};

export default WishForm;
