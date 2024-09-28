import React, { useState } from "react";
import "./SignUP.css";
import signUpImage from "../../Assets/Sign up-rafiki.png";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUP = () => {
  const nav = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const [userData, setUserData] = useState({
    UserName: "",
    Email: "",
    UserPass: ""
  });


  const [error, setError] = useState(""); // Add error state
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.UserName || !userData.Email || !userData.UserPass) {
      setError("Please fill in all required fields.");
      return;
    }

    

    try {
      const response = await axios.post(
        "https://localhost:7063/api/User/CreateUser",
        userData
      );
      console.log(response);
      toast.success("Signup successful! Please log in.");
      nav("/login");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);  // Show the error message from the backend
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      console.log(error);
    }
  };

  return (
    <MDBContainer fluid className="signup-container">
      <ToastContainer />
      <div className="align-items-center">
        <MDBRow>
          <MDBCol md="6" className="signup-form-image-container">
            <img
              src={signUpImage}
              alt="Sign Up Visual"
              className="signup-image"
            />
          </MDBCol>

          <MDBCol md="6" >
            <MDBCard className="signup-form-card">
              <MDBCardBody>
                <h3 className="text-center mb-4">Sign Up</h3>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                      <MDBInput
                        label="User Name"
                        name="UserName"
                        value={userData.UserName}
                        onChange={handleChange}
                        required
                        className="mb-4"
                      />
                      <MDBInput
                      type="email"
                        label="Email"
                        name="Email"
                        value={userData.Email}
                        onChange={handleChange}
                        required
                        className="mb-4"
                      />
                      <MDBInput
                        type="Password"
                        label="Password"
                        name="UserPass"
                        value={userData.UserPass}
                        onChange={handleChange}
                        required
                        className="mb-4"
                      />
                  <button type="submit" className="w-100 mb-4">
                    Sign Up
                  </button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Show error message */}

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
};

export default SignUP;
