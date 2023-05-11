import React, { useState } from "react";
import restrautList from "../utils/mockData";
import RestaurantCard from "./RestaurantCard";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState(restrautList);

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            filetredList = listOfRestaurants.filter(
              (res) => res.data.avgRating >= 4
            );
            setListOfRestaurants(filetredList);
            console.log("filetredList", filetredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restraut) => (
          <RestaurantCard key={restraut.data.id} resData={restraut} />
        ))}
      </div>
    </div>
  );
};

export default Body;
