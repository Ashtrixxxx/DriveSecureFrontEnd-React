import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";

export const Navbar = () => {
  const [displayLogin, setDisplayLogin] = useState(false);
  const [displayLogOut, setDisplayLogout] = useState(false);
  const [username, setUsername] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("Auth-Token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.sub);
      setDisplayLogin(false);
      setDisplayLogout(true);
    } else {
      setDisplayLogin(true);
    }
  }, []);

  const toggleDropdown = () => {
    console.log(isDropdownVisible);

    setDropdownVisible(!isDropdownVisible); // Toggle dropdown visibility
  };

  const handleLogOut=()=>{
    localStorage.removeItem("Auth-Token");
    console.log("Token not valid anymore ");
    nav("/");
    window.location.reload();

  }

  return (
    <div>
      <nav className="nav-bar1">
        <h3>Drive Secure</h3>
        <ul className="ul-list1">
          <Link to="/">
            <li>Home</li>
          </Link>
          <li>About</li>
          <li>Services</li>
          <li>Products</li>
          <li>Support</li>
          {displayLogin && (
            <div className="btndiv">
              <Link to="/login">
                <button className="btn">Login</button>
              </Link>
              <Link to="/Signup">
                <button className="btn">Sign Up</button>
              </Link>
            </div>
          )}
          {displayLogOut && (
            <div class="dropdown show">
              <a
                class="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {username}
              </a>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a class="dropdown-item" href="#">
                  DashBoard
                </a>
                <a class="dropdown-item" onClick={handleLogOut}>
                  LogOut
                </a>
                
              </div>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};
