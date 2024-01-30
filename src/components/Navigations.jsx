import bookLogo from "../assets/books.png";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import PropTypes from "prop-types";

export default function Navigations({ isLoggedIn, onLogout }) {
  return (
    <div id="nav-bar">
      <h1>
        <img id="logo-image" src={bookLogo} alt="BookBuddy logo" />
        Bookbuddy
      </h1>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to={"/account"}>Account</Link>
          </li>
        )}
        {isLoggedIn ? (
          <li>
            <Logout onLogout={onLogout} />
          </li>
        ) : (
          <>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

Navigations.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};
