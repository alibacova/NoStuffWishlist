import React, { useState } from "react";
import { useWishListContext } from "../hooks/useWishListContext.js";
import { useAuthContext } from "../hooks/useAuthContext.js";
import axios from "axios";
import { Button, Grid, Stack, Paper, Container } from "@mui/material";
import FormInput from "./FormInput.jsx";
import { GenericIconButton as IconButton } from "./IconButton.jsx";

const WishForm = ({ setShowEdit, setShowForm, type, wish }) => {
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
    if (!newWish.title) {
      setError("Please fill in the title");
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
        .catch((err) => {
          setError(err.response.data.error);
        });
      setWish(initialWish);
      setShowForm(false);
    } else if (type === "edit") {
      axios
        .put(`/api/wishList/${wish._id}`, newWish, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((result) => {
          dispatch({ type: "UPDATE_WISH", payload: result.data });
        })
        .catch((err) => setError(err));
      setShowEdit(false);
    }
    setError(null);
  };

  const handleCloseForm = () => {
    if (type === "add") {
      setShowForm(false);
    } else if (type === "edit") {
      setShowEdit(false);
    }
  };

  return (
    <Container>
      <Paper component="form" square={false} sx={{ bgcolor: "#FEE7DC" }}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={1}>
            <IconButton
              handleClick={handleCloseForm}
              type="close"
              color="#8338EC"
            />
          </Grid>
        </Grid>
        <Stack spacing={1} sx={{ bgcolor: "#FEE7DC" }} margin={5}>
          <FormInput
            error={error !== null}
            helperText={error}
            id="wish-title"
            isRequired={true}
            label="Title"
            onChange={(e) => {
              if (error) {
                setError(null);
              }
              setWish({ ...newWish, title: e.target.value });
            }}
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
        </Stack>
      </Paper>
    </Container>
  );
};

export default WishForm;
