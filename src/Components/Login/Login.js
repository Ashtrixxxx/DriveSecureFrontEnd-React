import React, { useState } from "react";
import "./Login.css";
import loginImage from "../../Assets/Computer login-rafiki.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";

const Login = () => {
  const nav = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isResetAvailable, setIsResetAvailable] = useState(false);
  const [email, setEmail] = useState("");

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
      const errorMessage = error.response.data.message;
console.log(errorMessage);


 if(errorMessage == "Invalid user credentials"){
  alert("No such user Found")
}
      else if (
        error.response &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        nav("/not-authorized");
      } 
     

      else {
        console.log("An error occurred", error);
      }
      console.error("Error:", error);
    }
    console.log("UserName:", userName);
    console.log("Password:", password);
    setError("");
  };

  const handleEmail = (value) => {
    setEmail(value);
  };

  const handlePasswordReset = () => {
    setIsResetAvailable(!isResetAvailable);
    console.log(isResetAvailable);
  };
  console.log(isResetAvailable);

  const handleResetEmail = async () => {
    console.log(email);

    try {
      const res = await axios.post(
        "https://localhost:7063/api/User/SendPasswordResetEmail",
       {email}
      );
      console.log(res.data);
      alert("Password reset email sent!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="login-container">
        <center>
          {showAlert && <div className="custom-alert">Welcome {userName}</div>}
        </center>
        <MDBCol md="6" className="image-section">
          <img src={loginImage} alt="Login Visual" className="login-image" />
        </MDBCol>
        <MDBCol md="6" className="form-section">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            {isResetAvailable == false ? (
              <div>
                <div className="form-group">
                  <label>User Name</label>
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
              </div>
            ) : (
              <div className="form-group">
                <label>Reset Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  required
                />
                <button type="button" onClick={handleResetEmail}>
                  Sent reset email
                </button>
              </div>
            )}

            <p className="text-center">
              Forgot Password?{" "}
              <a onClick={handlePasswordReset}>Reset Password</a>{" "}
              {/* Link to signup page */}
            </p>
          </form>
          <p className="text-center">
            Don't have an account? <Link to="/SignUP">Register</Link>{" "}
            {/* Link to signup page */}
          </p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
