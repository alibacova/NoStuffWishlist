import React, { useEffect } from "react";
import { useWishListContext } from "../hooks/useWishListContext.js";
import { useAuthContext } from "../hooks/useAuthContext.js";
import axios from "axios";
import WishList from "../components/WishList.jsx";
import WishForm from "../components/WishForm.jsx";
import { Button } from "@mui/material";

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
    <div>
      {user ? <WishForm type="add" /> : null}
      <WishList wishList={wishList} />
    </div>
  );
};

export default Home;
