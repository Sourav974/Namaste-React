import React, { useState, useEffect } from "react";

import restrautList from "../utils/mockData";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

function filterData(searchText, allRestaurants) {
  const data = allRestaurants.filter((restaurant) =>
    restaurant?.data?.name?.toLowerCase().includes(searchText.toLowerCase())
  );
  return data;
}

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    Swiggy();
  }, []);

  async function Swiggy() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    console.log(json);
  }

  console.log("render");
  // not render component(Early return)
  if (!allRestaurants) return null;

  if (filteredRestaurants.length === 0)
    return <h1>No restaurant match found</h1>;

  return allRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            filetredList = allRestaurants.filter(
              (res) => res.data.avgRating >= 4.2
            );
            setFilteredRestaurants(filetredList);
            console.log("filetredList", filetredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          class-name="search-input"
          placeholder="Search here"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button
          className="search-btn"
          onClick={() => {
            // need to filter the data
            const data = filterData(searchText, allRestaurants);
            // update the state - restaurant
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>

      <div className="res-container">
        {filteredRestaurants.map((restraut) => (
          <RestaurantCard key={restraut.data.id} resData={restraut} />
        ))}
      </div>
    </div>
  );
};

export default Body;
