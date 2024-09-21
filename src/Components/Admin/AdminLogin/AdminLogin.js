import React, { useState } from "react";
import "../../Login/Login.css";
//import loginImage from "../../Assets/Computer login-rafiki.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";

const AdminLogin = () => {
  const nav = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const [AdminEmail, setAdminEmail] = useState("");
  const [AdminPass, setAdminPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!AdminEmail || !AdminPass) {
      setError("Please fill in both the fields");
      return;
    }
    try {
      const response = await axios.post(
        "https://localhost:7063/api/Auth/AdminAuth",
        {
          AdminEmail: AdminEmail,
          AdminPass: AdminPass,
        }
      );
      console.log(response.data);
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      // Redirect user to login page
      setTimeout(() => {
        nav("dashboard");
      }, 2000);
      const token = response.data.token;
      localStorage.setItem("Admin-Token", token);
      console.log(localStorage.getItem("Admin-Token"));

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.nameid;
      console.log(userId);
    } catch (error) {
        if (error.response) {
            // Log the server's validation errors
            console.log('Validation Errors:', error.response.data.errors);
          } else {
            // Log any other type of error
            console.error('Error:', error.message);
          }
      console.error("Error:", error);
    }
    // console.log("UserName:", userName);
    // console.log("Password:", password);
    setError("");
  };

  return (
    <MDBContainer  >
    <MDBRow className="login-container">
      <center>
        {showAlert && <div className="custom-alert">Welcome {AdminEmail}</div>}
      </center>
      <MDBCol md="6" className="image-section">
        <img  alt="Login Visual" className="login-image" />
      </MDBCol>
      <MDBCol md="6" className="form-section">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={AdminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={AdminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  );
};

export default AdminLogin;
