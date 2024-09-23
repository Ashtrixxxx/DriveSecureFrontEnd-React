import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "../../Assets/Gemini_Generated_Image_mesf6xmesf6xmesf-removebg-preview.png"
import axios from "axios";

export const Navbar = () => {
  const [displayLogin, setDisplayLogin] = useState(false);
  const [displayLogOut, setDisplayLogout] = useState(false);
  const [username, setUsername] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
  const [userData, setUserData] = useState([]);
  const nav = useNavigate();
  console.log(userData);
  useEffect(() => {
    const token = localStorage.getItem("Auth-Token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.sub);

      const fetchData = async () => {
        try {
          // Wait until username is set
          if (username) {
            const response = await axios.get(
              `https://localhost:7063/api/User/GetUserByUserName/${username}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setUserData(response.data); // Access response data
            console.log(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
      setDisplayLogin(false);
      setDisplayLogout(true);
    } else {
      setDisplayLogin(true);
    }
  }, [username]); // Dependency array to rerun effect when username changes

  const toggleDropdown = () => {
    console.log(isDropdownVisible);

    setDropdownVisible(!isDropdownVisible); // Toggle dropdown visibility
  };

  const handleLogOut = () => {
    localStorage.removeItem("Auth-Token");
    console.log("Token not valid anymore ");
    nav("/");
    window.location.reload();
  };

  return (
    <div>
      <nav className="nav-bar1">
        <h3><img src={img}/></h3>
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
            <div className="dropdown show">
              <a
                className="btn dropdown-toggle"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {username}
              </a>
              
              {console.log(userData.profileUrl)}

              {userData.profileUrl && (
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <Link to="/user/dashboard" className="dropdown-item">
                    DashBoard
                  </Link>
                  <a className="dropdown-item" onClick={handleLogOut}>
                    LogOut
                  </a>
                </div>
              )}
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};
