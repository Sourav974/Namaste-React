import React from "react";
import { CDN_URL } from "../utils/constant";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    deliveryTime,
  } = resData;
  return (
    <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200">
      <img className="res-logo" src={CDN_URL + cloudinaryImageId} />
      <h2 className="font-bold py-4 text-lg">{name}</h2>
      <h3>{cuisines.join(", ")}</h3>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo / 100} For Two</h4>
      <h4>{deliveryTime}</h4>
    </div>
  );
};

export default RestaurantCard;
