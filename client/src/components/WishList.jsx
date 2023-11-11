import React, { useState, useEffect } from "react";
import { Typography, Button, Stack, Container } from "@mui/material";
import Wish from "./Wish.jsx";
import WishForm from "./WishForm.jsx";
import WishListFilters from "./WishListFilters.jsx";
import { useWishListContext } from "../hooks/useWishListContext.js";

const WishList = () => {
  const { wishList } = useWishListContext();
  const [list, setList] = useState([]);
  const [showNewWishForm, setShowNewWishForm] = useState(false);

  useEffect(() => {
    setList(wishList);
  }, [wishList]);

  const addNewWish = () => {
    setShowNewWishForm(!showNewWishForm);
  };

  const noMatchesFound = () => {
    return (
      <Typography
        variant="h3"
        align="center"
        sx={{ py: 2, color: "#A53603", fontWeight: "bold" }}
      >
        No wishes found
      </Typography>
    );
  };

  return (
    <Container>
      <Typography
        variant="h2"
        align="center"
        sx={{
          py: 2,
          color: "#A53603",
          fontFamily: "Tilt Prism",
          fontWeight: "bold",
        }}
      >
        Wishes
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        <WishListFilters setList={setList} />
        <Button
          sx={{ borderRadius: 8 }}
          variant="contained"
          onClick={addNewWish}
        >
          Add new wish
        </Button>
      </Stack>
      {showNewWishForm && <WishForm type="add" />}
      {list?.length
        ? list.map((wish) => <Wish wish={wish} key={wish._id} />)
        : noMatchesFound()}
    </Container>
  );
};

export default WishList;
