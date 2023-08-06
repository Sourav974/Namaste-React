import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import UserContext from "../utils/UserContext";

function filterData(searchText, allRestaurants) {
  const data = allRestaurants.filter((restaurant) =>
    restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return data;
}

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  const GoodRating = withPromotedLabel(RestaurantCard);

  console.log("allRestaurants", allRestaurants);

  const { loggedInUser, setUserName } = useContext(UserContext);

  useEffect(() => {
    Swiggy();
  }, []);

  async function Swiggy() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setAllRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    console.log(json);
  }

  console.log("render");
  // not render component(Early return)
  if (!allRestaurants) return null;

  // if (filteredRestaurants?.length === 0)
  //   return <h1>No Restraunt match your Filter!!</h1>;

  // if (allRestaurants.length === 0) {
  //   return <Shimmer />;
  // }

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return <h1>No Internet!!</h1>;
  }

  return allRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            placeholder="Search here"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            className="px-4   bg-green-100 m-4 rounded-lg"
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
        <div className="m-4 p-4 flex items-center">
          <button
            className="filter-btn px-4  bg-gray-100 m-4 rounded-lg"
            onClick={() => {
              const filetredList = allRestaurants.filter(
                (res) => res.info.avgRating > 4
              );
              setFilteredRestaurants(filetredList);
              console.log("filetredList", filetredList);
            }}
          >
            Top Rated Restaurants
          </button>
          <input
            className=" border border-black"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap">
        {filteredRestaurants?.map((restaurant) => (
          <Link
            key={restaurant?.info?.id}
            to={"restaurants/" + restaurant?.info?.id}
          >
            {restaurant?.info?.avgRating > 4 ? (
              <GoodRating resData={restaurant?.info} />
            ) : (
              <RestaurantCard resData={restaurant?.info} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
