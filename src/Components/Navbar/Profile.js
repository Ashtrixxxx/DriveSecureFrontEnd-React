import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import './Profile.css'; // Import your CSS styles

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
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
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

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
  }, [userId]);

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
      console.error("Error updating profile", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    // Close modal when clicking on the modal background (overlay)
    if (e.target.className === "modal") {
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
          <button onClick={openModal}>Edit Profile</button>
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

      {isModalOpen && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent click event from bubbling up to the modal background */}
            <span className="close" onClick={closeModal}>&times;</span>
            <h3>Edit Your Profile</h3>
            <form onSubmit={handleUpdateProfile}>
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
