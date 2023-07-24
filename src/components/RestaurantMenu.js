import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [restaurants, setRestaurants] = useState([{}]);
  const [resmenu, setResMenu] = useState([{}]);

  useEffect(() => {
    getRestaurantsID();
  }, []);
  // const { id, name, avgRating, cloudinaryImageId, city, costForTwoMessage } =
  //   restaurants;

  // how to read the dynamic url
  const { resid } = useParams();
  // console.log(param);

  async function getRestaurantsID() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pI?page-type=REGULAR_MENU&complete-menu=true&lat=30.3164945&ng=78.03219179999999&restaurantid=" +
        "resid" +
        "&submitAction=ENTER"
      // "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.022505&lng=72.5713621&restaurantId=" +
      //   resid +
      //   "&submitAction=ENTER"
    );
    const json = await data.json();
    console.log("data", json);
    setRestaurants(json.data?.cards[0]?.card?.card?.info); //47589
    console.log("restaurants", restaurants);
    setResMenu(json.data?.cards[2]);
    // console.log(resmenu);
  }

  return (
    <div>
      <h1>Restaurant id: {resid}</h1>
      {/* <h2>{restaurant.name}</h2> */}
    </div>
  );
};

export default RestaurantMenu;
