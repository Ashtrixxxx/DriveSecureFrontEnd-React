import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { 
MDBContainer, 
MDBInput, 
MDBBtn, 
MDBModal, 
MDBModalDialog, 
MDBModalContent, 
MDBModalHeader, 
MDBModalTitle, 
MDBModalBody, 
MDBModalFooter } from "mdb-react-ui-kit";

const Profile = () => {
    const [profile, setProfile] = useState({
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
        isProfiled: 0, // Flag for edited profile
  });

  const [showEditModal, setShowEditModal] = useState(false);// Modal for editing profile
  const [isProfileEdited, setIsProfileEdited] = useState(false);
  
  useEffect(() => {
    // Fetch the profile data
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("Auth-Token");
        const response = await axios.get("https://localhost:7063/api/UserProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
        if (!response.data.isProfiled) {
          setShowEditModal(true); // Show modal if profile is not edited
        } else {
          setIsProfileEdited(true); // Set flag if profile is already edited
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    fetchProfileData();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("Auth-Token");
      await axios.put("https://localhost:7063/api/UserProfile", profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile updated successfully!");
      setIsProfileEdited(true);
      setShowEditModal(false); // Close modal after saving
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };
 
  return (
    <MDBContainer>
        <h2>Profile</h2>
        {/* If profile is already edited, show the profile */}
      {isProfileEdited ? (
        <div className="profile-details">
          <p><strong>First Name:</strong> {profile.firstName}</p>
          <p><strong>Last Name:</strong> {profile.lastName}</p>
          <p><strong>Date of Birth:</strong> {profile.dob}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Occupation:</strong> {profile.occupation}</p>
          <p><strong>Address:</strong> {profile.streetAddr}, {profile.city}, {profile.country} - {profile.zipcode}</p>
          <MDBBtn onClick={() => setShowEditModal(true)}>Edit Profile</MDBBtn>
        </div>
      ) : (
        <>
          {/* If profile is not edited, show a button to prompt the user */}
          <MDBBtn onClick={() => setShowEditModal(true)}>Edit Your Profile</MDBBtn>
        </>
      )}
     {/* Profile Edit Modal */}
     <MDBModal show={showEditModal} setShow={setShowEditModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Profile</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setShowEditModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                label="Profile URL"
                name="profileUrl"
                value={profile.profileUrl}
                onChange={handleInputChange}
                required
              />
              <MDBInput
                label="First Name"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                required
              />
              <MDBInput
                label="Last Name"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                required
              />
              <MDBInput
                label="Date of Birth"
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleInputChange}
                required
              />
              <MDBInput
                label="Gender"
                name="gender"
                value={profile.gender}
                onChange={handleInputChange}
                required
              />
              <MDBInput
                label="Phone"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                required
              />
              <MDBInput
                label="Occupation"
                name="occupation"
                value={profile.occupation}
                onChange={handleInputChange}
                required
              />
              <MDBInput
                label="Street Address"
                name="streetAddr"
                value={profile.streetAddr}
                onChange={handleInputChange}
                required
              />
              <MDBInput
                label="Country"
                name="country"
                value={profile.country}
                onChange={handleInputChange}
                required
              />
              <MDBInput
                label="Zipcode"
                name="zipcode"
                value={profile.zipcode}
                onChange={handleInputChange}
                required
              />
              <MDBInput
                label="City"
                name="city"
                value={profile.city}
                onChange={handleInputChange}
                required
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setShowEditModal(false)}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSaveProfile}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
};

export default Profile;