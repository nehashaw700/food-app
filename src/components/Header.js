import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useContext } from "react";
// works as anchor tag but does not reloads the page

const Header = () => {
  const {loggedInUser} = useContext(UserContext);

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
          <li> <Link to = "/"> Home </Link></li>
          <li> <Link to = "/about"> About Us</Link></li>
          <li>Contact Us</li>
          <li>Cart(0)</li>
          <li>{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
