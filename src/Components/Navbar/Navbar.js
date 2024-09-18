import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
          <div className="btndiv">
            <button className="btn">Login</button>
            <button className="btn">SignUp</button>
          </div>
        </ul>
      </nav>
    </div>
  );
};
