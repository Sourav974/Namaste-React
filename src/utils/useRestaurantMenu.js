import React, { useState, useEffect } from "react";
import { MENU_API } from "./constant";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  const fetchRestaurantMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    setResInfo(json.data);
  };

  useEffect(() => {
    fetchRestaurantMenu();
  }, []);

  return resInfo;
};

export default useRestaurantMenu;
