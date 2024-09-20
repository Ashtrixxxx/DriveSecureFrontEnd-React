import React,{useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {useNavigate } from "react-router-dom";


export const DisplayVehicles = () => {
    let UserId = null;
    const token = lolcalStorage.getItem("Auth-Token");

    if(token) {
        const decodedToken = jwtDecode(token);
        UserId = decodedToken.nameid;
    } else {
        console.log("Token Not Available");
    }
     

    const [vehicleData, setVehicleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchVehicles = async () => {
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
                setError("Failed to fetch Vehicle Details");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if (UserId) {
            fetchVehicles();
        }
    }, [UserId, token]);

    if(loading) return <div>Loading...</div>;//Show loading state
    if(error) return <div>{error}</div>;//Show error message if any
    
    return (
        <div>
            <h1>Vehicle Details</h1>
            {vehicleData.length > 0 ? (
                vehicleData.map((vehicle) => (
               <div key={vehicle.vehicleId} style={{ margin: "20px", padding: "10px", border: "1px solid #ccc" }}> 
                <h2>Vehicle Type: {vehicle.vehicleType}</h2>
                <p>Model: {vehicle.vehicleModel}</p>
                <p>Engine Number: {vehicle.engineNumber}</p>
                <p>Year of Manufacturer: {vehicle.yearOfManufacturer}</p>
                <p>Fuel Type: {vehicle.fuelType}</p>
                <p>License Plate Number: {vehicle.licensePlateNumber}</p>
                <p>Vehicle Condition: {vehicle.vehicleCondition}</p>
                <p>Transmission Type: {vehicle.transmissionType}</p>
                </div>
                ))
            ) : (
                <p>No Vehicls Found.</p>
            )}
        </div>
    );

};