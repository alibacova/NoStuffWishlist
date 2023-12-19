import { useState, useEffect } from "react";
import { useWishListContext } from "../hooks/useWishListContext.js";
import { FilterButton } from "./FilterButton.jsx";

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
      <FilterButton
        disabled={filterType === "all"}
        onClick={() => {
          handleFilter("all");
        }}
        text="All"
      />
      <FilterButton
        disabled={filterType === "reserved"}
        onClick={() => {
          handleFilter("reserved");
        }}
        text="Reserved"
      />
      <FilterButton
        disabled={filterType === "non-reserved"}
        onClick={() => {
          handleFilter("non-reserved");
        }}
        text="Non-reserved"
      />
      <FilterButton
        disabled={filterType === "fulfilled"}
        onClick={() => {
          handleFilter("fulfilled");
        }}
        text="Fulfilled"
      />
      <FilterButton
        disabled={filterType === "active"}
        onClick={() => {
          handleFilter("active");
        }}
        text="Active"
      />
    </>
  );
};

export default WishListFilters;
