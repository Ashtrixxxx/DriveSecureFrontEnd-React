import React from 'react';
import { useLocation } from 'react-router-dom';
import "./DetailedVehicle.css"

export const DetailedVehicle = () => {
  const location = useLocation();
  const vehicleData = location.state?.vehicle;
  console.log(vehicleData);

  return (
    <div>
      <div className="vehicle-card">
        <h2>Vehicle Details</h2>
        <div className="vehicle-details">
          <div className="vehicle-row">
            <span className="label">Vehicle Model:</span>
            <span className="value">{vehicleData.vehicleModel}</span>
          </div>
          <div className="vehicle-row">
            <span className="label">Vehicle Type:</span>
            <span className="value">{vehicleData.vehicleType}</span>
          </div>
          <div className="vehicle-row">
            <span className="label">Year of Manufacture:</span>
            <span className="value">{vehicleData.yearOfManufacture}</span>
          </div>
          <div className="vehicle-row">
            <span className="label">Vehicle Identification Number (VIN):</span>
            <span className="value">{vehicleData.vehicleIdentificationNumber}</span>
          </div>
          <div className="vehicle-row">
            <span className="label">Engine Number:</span>
            <span className="value">{vehicleData.engineNumber}</span>
          </div>
          <div className="vehicle-row">
            <span className="label">Engine Type:</span>
            <span className="value">{vehicleData.engineType}</span>
          </div>
          <div className="vehicle-row">
            <span className="label">Fuel Type:</span>
            <span className="value">{vehicleData.fuelType}</span>
          </div>
          <div className="vehicle-row">
            <span className="label">Transmission Type:</span>
            <span className="value">{vehicleData.transmissionType}</span>
          </div>
          <div className="vehicle-row">
            <span className="label">License Plate Number:</span>
            <span className="value">{vehicleData.licensePlateNumber}</span>
          </div>
          <div className="vehicle-row">
            <span className="label">List Price:</span>
            <span className="value">${vehicleData.listPrice}</span>
          </div>
          <div className="vehicle-row">
            <span className="label">Vehicle Condition:</span>
            <span className="value">{vehicleData.vehicleCondition}</span>
          </div>
          <div className="vehicle-row">
            <span className="label">Number of Seats:</span>
            <span className="value">{vehicleData.numberOfSeats}</span>
          </div>
          <div className="vehicle-row">
            <span className="label">Number of Previous Owners:</span>
            <span className="value">{vehicleData.numberOfPreviousOwners}</span>
          </div>
          <div className="vehicle-row">
            <span className="label">Service History:</span>
            <span className="value">{vehicleData.serviceHistory}</span>
          </div>
          <div className="vehicle-row">
            <span className="label">Last Service Date:</span>
            <span className="value">{vehicleData.lastServiceDate}</span>
          </div>
          <div className="vehicle-row">
            <span className="label">Registration Date:</span>
            <span className="value">{vehicleData.registrationDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
