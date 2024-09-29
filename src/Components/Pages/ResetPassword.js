import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./ResetPassword.css";

export const ResetPassword = () => {
  const [pass, setPass] = useState("");
  const location = useLocation(); // Access the current URL
  const [token, setToken] = useState(null); // State to hold the token value
    const nav = useNavigate();
  useEffect(() => {
    // Use URLSearchParams to get the token from the query string
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get("token"); // Get the 'token' query param
    setToken(tokenParam); // Store the token in state
  }, [location.search]);

  const handleReset = () => {
    console.log(token);
    console.log(pass);
    
    
    const val = {
      token,
      pass,
    };

    try {
      const res = axios.post(
        `https://localhost:7063/api/User/ResetPassword/`,
        {
            token,
            password: pass
        }
      );

      nav("/login")
      console.log(res);
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="reset-container">
    <h2>Reset Your Password</h2>
    <form className="reset-form">
      <input
        className="reset-input"
        type="password"
        placeholder="Enter your new password"
        onChange={(event) => setPass(event.target.value)}
        value={pass} // Display the current password state in the input
      />
      <button className="reset-button" onClick={handleReset}>
        Reset My Password
      </button>
    </form>
  </div>
);
};
