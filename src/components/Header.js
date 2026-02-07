import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useContext } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const {loggedInUser} = useContext(UserContext);

  // Subscribing to the store using Selector
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://img.freepik.com/premium-vector/online-food-app-icon-food-shop-location-logo-also-online-resturent-location-template_608547-155.jpg"
        ></img>
      </div>

      <div className="navBar">
        <ul>
          {/*  works as anchor tag but does not reloads the page */}
          <li> <Link to = "/"> Home </Link></li>
          <li> <Link to = "/about"> About Us</Link></li>
          <li>Contact Us</li>
          <li> <Link to="/cart"> Cart({cartItems.length}) </Link> </li>
          <li>{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
