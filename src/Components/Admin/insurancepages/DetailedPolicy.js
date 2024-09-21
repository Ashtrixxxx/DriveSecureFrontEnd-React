import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../user/InsurancePages/DetailInsurance.css";
import axios from "axios";
export const DetailedPolicy = () => {
  const location = useLocation();
  const data = location.state?.insurance;
  const token = localStorage.getItem("Admin-Token");
  console.log(token);

  console.log(data);
  const [vehicleData, setVehicleData] = useState([]);
  const [docData,setDocData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7063/api/Vehicle/GetVehicleForPolicy/${data.policyID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
        setVehicleData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDocData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7063/api/SupportDocument/GetSupportDocumnetsForPolicy/${data.policyID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setDocData(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocData();
    fetchData();
  }, []);

  return (
    <div style={{display:'flex'}}>
      <div className="insurance-card">
        <h2>Insurance Details</h2>
        <div className="insurance-details">
          <div className="insurance-row">
            <span className="label">Policy ID:</span>
            <span className="value">{data.policyID}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Coverage Type:</span>
            <span className="value">{data.coverageType}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Coverage Amount:</span>
            <span className="value">${data.coverageAmount}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Coverage Start Date:</span>
            <span className="value">{data.coverageStartDate}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Coverage End Date:</span>
            <span className="value">{data.coverageEndDate}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Is Renewed:</span>
            <span className="value">{data.isRenewed ? "Yes" : "No"}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Status:</span>
            <span className="value">
              {(() => {
                switch (data.status) {
                  case 0:
                    return "Pending";
                  case 1:
                    return "Viewed";
                  case 2:
                    return "Accepted";
                  case 3:
                    return "Rejected";
                }
              })()}
            </span>
          </div>
        </div>
      </div>
      <div className="insurance-card">
        <h2>Vehicle Details</h2>
        <div className="insurance-details">
          <div className="insurance-row">
            <span className="label">Engine Number:</span>
            <span className="value">{vehicleData.engineNumber}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Engine Type:</span>
            <span className="value">{vehicleData.engineType}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Fuel Type:</span>
            <span className="value">{vehicleData.fuelType}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Last Service Date:</span>
            <span className="value">{vehicleData.lastServiceDate}</span>
          </div>
          <div className="insurance-row">
            <span className="label">License Plate Number:</span>
            <span className="value">{vehicleData.licensePlateNumber}</span>
          </div>
          <div className="insurance-row">
            <span className="label">List Price:</span>
            <span className="value">${vehicleData.listPrice}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Number of Previous Owners:</span>
            <span className="value">{vehicleData.numberOfPreviousOwners}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Number of Seats:</span>
            <span className="value">{vehicleData.numberOfSeats}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Registration Date:</span>
            <span className="value">{vehicleData.registrationDate}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Service History:</span>
            <span className="value">{vehicleData.serviceHistory}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Transmission Type:</span>
            <span className="value">{vehicleData.transmissionType}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Vehicle Condition:</span>
            <span className="value">{vehicleData.vehicleCondition}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Vehicle Model:</span>
            <span className="value">{vehicleData.vehicleModel}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Vehicle Type:</span>
            <span className="value">{vehicleData.vehicleType}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Year of Manufacture:</span>
            <span className="value">{vehicleData.yearOfManufacture}</span>
          </div>
        </div>
      </div>
      <div className="insurance-card">
        <h2>Document Details</h2>
        <div className="insurance-details">
          <div className="insurance-row">
            <span className="label">Document ID:</span>
            <span className="value">{docData.documentId}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Address Proof:</span>
            <span className="value">{docData.addressProof}</span>
          </div>
          <div className="insurance-row">
            <span className="label">RC Proof:</span>
            <span className="value">{docData.rcProof}</span>
          </div>
          <div className="insurance-row">
            <span className="label">Policy ID:</span>
            <span className="value">{docData.policyID}</span>
          </div>
          <div className="insurance-row">
            <span className="label">User ID:</span>
            <span className="value">{docData.userID}</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};
