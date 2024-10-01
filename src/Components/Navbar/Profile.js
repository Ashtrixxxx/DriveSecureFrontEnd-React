import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // corrected the import
import './Profile.css'; // Make sure your modal CSS is correct
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    userId : userId,
    profileUrl: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    occupation: "",
    streetAddr: "",
    country: "",
    zipcode: "",
    city: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const nav = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("Auth-Token"));

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.nameid);
      } catch (error) {
        console.error("Token decoding failed", error);
      }
    }
  }, [token]);

  // Update formData when userId is available
  useEffect(() => {
    if (userId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: userId
      }));
    }
  }, [userId]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`https://localhost:7063/api/UserProfile/GetUserProfile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setProfile(response.data);
          setFormData(response.data); // Pre-fill formData with profile data
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://localhost:7063/api/UserProfile/CreateUserProfile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile created successfully!");
      setProfile(formData);
      setFormData({ profileUrl: "", firstName: "", lastName: "", dob: "", gender: "", phone: "", occupation: "", streetAddr: "", country: "", zipcode: "", city: "" });
    } catch (error) {
      console.error("Error creating profile", error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://localhost:7063/api/UserProfile/UpdateUserProfile/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile updated successfully!");
      setProfile(formData);
      setIsModalOpen(false); // Close modal after update
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        // If the error is 400 or 401, navigate to 'Not Authorized' page
        nav("/not-authorized");
      } else {
        console.log("An error occurred", error);
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal();
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <div className="profile-details">
          <p><strong>First Name:</strong> {profile.firstName}</p>
          <p><strong>Last Name:</strong> {profile.lastName}</p>
          <p><strong>Date of Birth:</strong> {profile.dob}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Occupation:</strong> {profile.occupation}</p>
          <p><strong>Address:</strong> {profile.streetAddr}, {profile.city}, {profile.country} - {profile.zipcode}</p>
          <button onClick={openModal}>Edit Profile</button> {/* Make sure this calls openModal */}
        </div>
      ) : (
        <form onSubmit={handleCreateProfile}>
          <h3>Create Your Profile</h3>
          <div>
            <label>Profile URL:</label>
            <input type="text" name="profileUrl" value={formData.profileUrl} onChange={handleInputChange} required />
          </div>
          <div>
            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Gender:</label>
            <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Phone:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Occupation:</label>
            <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Street Address:</label>
            <input type="text" name="streetAddr" value={formData.streetAddr} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Country:</label>
            <input type="text" name="country" value={formData.country} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Zipcode:</label>
            <input type="text" name="zipcode" value={formData.zipcode} onChange={handleInputChange} required />
          </div>
          <div>
            <label>City:</label>
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
          </div>
          <button type="submit">Create Profile</button>
        </form>
      )}

      {/* Modal */}
      {isModalOpen && (  // If isModalOpen is true, show modal
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <form onSubmit={handleUpdateProfile}>
              <h3>Edit Profile</h3>
              <div>
                <label>Profile URL:</label>
                <input type="text" name="profileUrl" value={formData.profileUrl} onChange={handleInputChange} required />
              </div>
              <div>
                <label>First Name:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Last Name:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Date of Birth:</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Gender:</label>
                <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Phone:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Occupation:</label>
                <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Street Address:</label>
                <input type="text" name="streetAddr" value={formData.streetAddr} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Country:</label>
                <input type="text" name="country" value={formData.country} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Zipcode:</label>
                <input type="text" name="zipcode" value={formData.zipcode} onChange={handleInputChange} required />
              </div>
              <div>
                <label>City:</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
              </div>
              <button type="submit">Update Profile</button>
              <button type="button" onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
