import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const DisplayInsurances = () => {
  let UserId = null; // Change to let
  const token = localStorage.getItem("Auth-Token");

  if (token) {
    const decodedToken = jwtDecode(token);
    UserId = decodedToken.nameid;
  } else {
    console.log("Token Not available");
  }

  const [insuranceData, setInsuranceData] = useState([]);

  useEffect(() => {
    
    const fetchInsurances = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7063/api/Policy/GetAllPolicies/${UserId}`, // Correct URL format
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the Authorization header
            },
          }
        );
       console.log(response.data);
       
        
        setInsuranceData(response.data); // Set the state with actual data
      } catch (error) {
    
        
        console.log(error);
      }
    };

    if (UserId) {
      fetchInsurances();
    }
  }, []); // Add UserId and token to dependency array

  return (
    <div>
      {insuranceData.map((item, index) => (
        <div key={index}>
          <h1>Policy Coverage Type: {item.coverageType}</h1>
          {/* Add other policy details here */}
        </div>
      ))}
    </div>
  );
};
