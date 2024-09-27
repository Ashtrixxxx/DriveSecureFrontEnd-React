import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../InsurancePages/DisplayInsurances.css"
import { Modal, Button } from "react-bootstrap"; 


export const DisplyVehicles = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedVehicle, setSelectedVehicle] = useState(null); // State to store the selected vehicle
 

  const token = localStorage.getItem("Auth-Token");
  const nav = useNavigate();

  

  let UserId = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    UserId = decodedToken.nameid;
  }

  useEffect(() => {
    

    const fetchInsurances = async () => {
   
      try {
        const response = await axios.get(
          `https://localhost:7063/api/Vehicle/GetAllVehicles/${UserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setVehicleData(response.data);
      } catch (error) {
        if (error.response && (error.response.status === 400 || error.response.status === 401)) {
          // If the error is 400 or 401, navigate to 'Not Authorized' page
          nav("/not-authorized"); 
        } else {
          console.log("An error occurred", error);
        }
        console.log(error);
      }
    };

    fetchInsurances();
  }, []);

  const handleShowDetails = (vehicle) => {
    setSelectedVehicle(vehicle); // Set the selected vehicle
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };
console.log(vehicleData);


  return (
    <div  >
      
      {vehicleData.map((item, index) => (
        <div key={index}>
          <div className="card">
            <div className="card-header">Vehicles</div>
            <div className="card-body">
              <h5 className="card-title">Vehicle ID: {item.vehicleId}</h5>
              <p className="card-text">Vehicle Type: {item.vehicleType}</p>
              <p className="card-text">
                 List Price: {item.listPrice}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => handleShowDetails(item)} // Trigger the modal
              >
                Show Details
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* Modal for showing vehicle details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Vehicle Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVehicle && (
            <div>
              <h5>Vehicle ID: {selectedVehicle.vehicleId}</h5>
              <p>Vehicle Type: {selectedVehicle.vehicleType}</p>
              <p>List Price: {selectedVehicle.listPrice}</p>
              <p>Last Service date: {selectedVehicle.lastServiceDate}</p>
              <p>Service history: {selectedVehicle.serviceHistory}</p>
              <p>Identification Number: {selectedVehicle.vehicleIdentificationNumber}</p>



              
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
