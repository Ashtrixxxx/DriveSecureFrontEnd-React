import React, { useState } from "react";
import "./Login.css";
import loginImage from "../../Assets/login.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const nav = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setError("Please fill in both the fields");
      return;
    }
    try {
      const response = await axios.post(
        "https://localhost:7063/api/Auth/UserAuth",
        {
          UserName: userName,
          UserPass: password,
        }
      );
      console.log(response.data);
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      // Redirect user to login page
      setTimeout(() => {
        nav("/");
      }, 2000);
      const token = response.data.token;
      localStorage.setItem("Auth-Token", token);
      console.log(localStorage.getItem("Auth-Token"));

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.nameid;
      console.log(userId);
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("UserName:", userName);
    console.log("Password:", password);
    setError("");
  };

  return (
    <div className="login-container">
        <center>
      {showAlert && (
        <div className="custom-alert">Welcome {userName}</div>
      )}
      </center>

      <div className="image-section">
        <img src={loginImage} alt="Login Visual" className="login-image" />
      </div>
      <div className="form-section">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your UserName"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
