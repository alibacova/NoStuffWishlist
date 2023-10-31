import React, { useEffect } from "react";
import { useWishListContext } from "../hooks/useWishListContext.js";
import axios from "axios";
import WishList from "../components/WishList.jsx";
import WishForm from "../components/WishForm.jsx";
import { Button } from "@mui/material";

const Home = () => {
  const { wishList, dispatch } = useWishListContext();

  useEffect(() => {
    axios
      .get("/api/wishList")
      .then((result) =>
        dispatch({ type: "SET_WISHLIST", payload: result.data }),
      )
      .catch((err) => console.error(err));
  }, [dispatch]);

  return (
    <div>
      <WishForm type="add" />
      <WishList wishList={wishList} />
    </div>
  );
};

export default Home;
