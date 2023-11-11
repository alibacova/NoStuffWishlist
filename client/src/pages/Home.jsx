import React, { useEffect } from "react";
import { useWishListContext } from "../hooks/useWishListContext.js";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { Container } from "@mui/material";
import axios from "axios";
import WishList from "../components/WishList.jsx";
import WishForm from "../components/WishForm.jsx";

const Home = () => {
  const { wishList, dispatch } = useWishListContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      axios
        .get("/api/wishList", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((result) =>
          dispatch({ type: "SET_WISHLIST", payload: result.data }),
        )
        .catch((err) => console.error(err));
    }
  }, [dispatch, user]);

  return (
    <Container maxWidth="md">
      <WishList />
    </Container>
  );
};

export default Home;
