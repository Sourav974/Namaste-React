import { useEffect, useState, useContext } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { loggedInUser } = useContext(UserContext);
  console.log("UserContext", loggedInUser);

  const onlineStatus = useOnlineStatus();

  // Subscribing to the store using a Selector

  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="flex justify-between bg-pink-200 mb-2">
      <div className="logo-container">
        <img className="w-56" src={LOGO_URL} />
      </div>

      <div className="flex items-center ">
        <ul className="flex p-4 m-4">
          <li className="px-4">Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>

          <li className="px-4">
            <Link to="/about">About</Link>
          </li>

          <li className="px-4">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>

          <li className="px-4 font-bold text-xl">
            <Link to="/cart">Cart - ({cartItems.length} items)</Link>
          </li>
          <li className="px-4 font-bold">{loggedInUser}</li>
        </ul>
      </div>
      {isLoggedIn ? (
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </div>
  );
};

export default Header;
