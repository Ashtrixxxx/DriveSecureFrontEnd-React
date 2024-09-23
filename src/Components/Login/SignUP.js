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
  const [userData, setUserData] = useState({
    FirstName: "",
    LastName: "",
    UserName: "",
    UserPass: "",
    ProfileUrl: "",
    DOB: "",
    Gender: "",
    Phone: "",
    Email: "",
    Occupation: "",
    role: 0,
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (!file) return;

    // Create FormData to send the file
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Make the Axios request to upload the file
      const response = await axios.post(
        "https://localhost:7063/api/FileUpload/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const fileId = response.data.fileId;
const viewLink = `https://drive.google.com/uc?export=view&id=${fileId}`; // Changed format


      setUserData({ ...userData, ProfileUrl: viewLink });

      console.log(fileId);
      // Handle the response (e.g., store the file link)
      console.log(response.data); // This will contain the file link
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };

  const [error, setError] = useState("");

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);

    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.FirstName || !userData.Email || !userData.UserPass) {
      setError("Please fill in all required fields.");
      return;
    }

    console.log("User Data:", userData);

    try {
      const response = await axios.post(
        "https://localhost:7063/api/User/CreateUser",
        userData
      );
      console.log(response);
      toast.success("Signup successful! Please log in.");
      nav("/login");
    } catch (error) {
      console.log(error);
    }

    console.log("User Data:", userData);
    setError("");
  };

  return (
    <MDBContainer fluid className="signup-container">
      <ToastContainer />
      <div className="signup-form-image-container">
        <MDBRow>
          <MDBCol md="6" className="d-flex-align-items-center">
            <img
              src={signUpImage}
              alt="Sign Up Visual"
              className="signup-image"
            />
          </MDBCol>

          <MDBCol md="6" lg="5">
            <MDBCard className="signup-form">
              <MDBCardBody>
                <h3 className="text-center mb-4">Sign Up</h3>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        label="profile"
                        name="Profile"
                        type="file"
                        onChange={handleFileChange}
                        required
                        className="mb-4"
                      />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput
                        label="First Name"
                        name="FirstName"
                        value={userData.FirstName}
                        onChange={handleChange}
                        required
                        className="mb-4"
                      />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput
                        label="Last Name"
                        name="LastName"
                        value={userData.LastName}
                        onChange={handleChange}
                        required
                        className="mb-4"
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        label="User Name"
                        name="UserName"
                        value={userData.UserName}
                        onChange={handleChange}
                        required
                        className="mb-4"
                      />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput
                        type="password"
                        label="Password"
                        name="UserPass"
                        value={userData.UserPass}
                        onChange={handleChange}
                        required
                        className="mb-4"
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        label="Profile URL"
                        name="ProfileUrl"
                        value={userData.ProfileUrl}
                        readOnly // Prevent user from editing this field directly
                        className="mb-4"
                      />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput
                        label="Date of Birth"
                        type="date"
                        name="DOB"
                        value={userData.DOB}
                        onChange={handleChange}
                        required
                        className="mb-4"
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        label="Gender"
                        name="Gender"
                        value={userData.Gender}
                        onChange={handleChange}
                        required
                        className="mb-4"
                      />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput
                        label="Phone"
                        name="Phone"
                        value={userData.Phone}
                        onChange={handleChange}
                        required
                        className="mb-4"
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        label="Email"
                        name="Email"
                        value={userData.Email}
                        onChange={handleChange}
                        required
                        className="mb-4"
                      />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput
                        label="Occupation"
                        name="Occupation"
                        value={userData.Occupation}
                        onChange={handleChange}
                        required
                        className="mb-4"
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBBtn type="submit" className="w-100 mb-4">
                    Sign Up
                  </MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
};

export default SignUP;
