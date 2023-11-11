import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useWishListContext } from "../hooks/useWishListContext.js";

const WishListFilters = ({ setList }) => {
  const { wishList } = useWishListContext();
  const [filterType, setFilterType] = useState("all");
  const [filteredLists, setFilteredLists] = useState({
    reservedList: [],
    nonReservedList: [],
    fulfilledList: [],
    activeList: [],
  });

  useEffect(() => {
    setFilteredLists({
      reservedList: wishList?.filter((wish) => wish.reserved),
      nonReservedList: wishList?.filter((wish) => !wish.reserved),
      fulfilledList: wishList?.filter((wish) => wish.fulfilled),
      activeList: wishList?.filter((wish) => !wish.fulfilled),
    });
  }, [wishList]);

  const handleFilter = (filter) => {
    setFilterType(filter);
    switch (filter) {
      case "all":
        setList(wishList);
        break;
      case "reserved":
        setList(filteredLists.reservedList);
        break;
      case "non-reserved":
        setList(filteredLists.nonReservedList);
        break;
      case "fulfilled":
        setList(filteredLists.fulfilledList);
        break;
      case "active":
        setList(filteredLists.activeList);
        break;
      default:
        setList(wishList);
        break;
    }
  };

  return (
    <>
      <Button
        sx={{ borderRadius: 8 }}
        variant="contained"
        disabled={filterType === "all"}
        onClick={() => {
          handleFilter("all");
        }}
      >
        All
      </Button>
      <Button
        sx={{ borderRadius: 8 }}
        variant="contained"
        disabled={filterType === "reserved"}
        onClick={() => {
          handleFilter("reserved");
        }}
      >
        Reserved
      </Button>
      <Button
        sx={{ borderRadius: 8 }}
        variant="contained"
        disabled={filterType === "non-reserved"}
        onClick={() => {
          handleFilter("non-reserved");
        }}
      >
        Non-reserved
      </Button>
      <Button
        sx={{ borderRadius: 8 }}
        variant="contained"
        disabled={filterType === "fulfilled"}
        onClick={() => {
          handleFilter("fulfilled");
        }}
      >
        Fulfilled
      </Button>
      <Button
        sx={{ borderRadius: 8 }}
        variant="contained"
        disabled={filterType === "active"}
        onClick={() => {
          handleFilter("active");
        }}
      >
        Active
      </Button>
    </>
  );
};

export default WishListFilters;
