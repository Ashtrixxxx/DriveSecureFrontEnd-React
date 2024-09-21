import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../InsurancePages/DisplayInsurances.css"

export const DisplyVehicles = () => {
  const [vehicleData, setVehicleData] = useState([]);

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
              <a
                className="btn btn-primary"
                onClick={() => {
                  nav("/user/DetailedVehicle", { state: { vehicle: item } });
                }}
              >
                Show Details
              </a>
            </div>
          </div>
        </div>
      ))}
      
    </div>
  );
};
