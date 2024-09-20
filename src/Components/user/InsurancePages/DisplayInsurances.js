import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FilterInsurance } from "./FilterInsurance";

export const DisplayInsurances = () => {
  const [insuranceData, setInsuranceData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const token = localStorage.getItem("Auth-Token");
  const nav = useNavigate();

  const filterSubmit = (data) => {
    setInsuranceData((prev) => [...prev, data]);
  };

  let UserId = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    UserId = decodedToken.nameid;
  }

  useEffect(() => {
    if (!token) {
      console.log("Token Not available");
      nav("/");
      return;
    }

    const fetchInsurances = async () => {
      if (!UserId) return;
      try {
        const response = await axios.get(
          `https://localhost:7063/api/Policy/GetAllPolicies/${UserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setInsuranceData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInsurances();
  }, []);

  return (
    <div>
      <button onClick={()=>{setShowFilter(!showFilter)}}>Filter</button>
      {showFilter && <FilterInsurance list={insuranceData} />}
      {insuranceData.map((item, index) => (
        <div key={index}>
          <div className="card">
            <div className="card-header">Policies</div>
            <div className="card-body">
              <h5 className="card-title">Policy ID: {item.policyID}</h5>
              <p className="card-text">Coverage Type: {item.coverageType}</p>
              <p className="card-text">
                Coverage Amount: {item.coverageAmount}
              </p>
              <a
                className="btn btn-primary"
                onClick={() => {
                  nav("/user/InsuranceDetails", { state: { insurance: item } });
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
