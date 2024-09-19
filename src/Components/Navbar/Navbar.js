import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [displayLogin, setDisplayLogin] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setDisplayLogin(false);
    } else {
      setDisplayLogin(true); 
    }
  }, []); 

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
              <Link to="/signup">
                <button className="btn">Sign Up</button>
              </Link>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};
