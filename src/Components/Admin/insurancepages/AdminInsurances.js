import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SideNav } from "../../Navbar/SideNav";
import "../../user/InsurancePages/DisplayInsurances.css"
import { FilterInsurance } from "../../user/InsurancePages/FilterInsurance";
export const AdminInsurances = () => {
    console.log("hi");
    const [showFilter, setShowFilter] = useState(false);
    const filterSubmit = (data) => {
        setInsuranceData((prev) => [...prev, data]);
      };
  const [insuranceData, setInsuranceData] = useState([]);

  const token = localStorage.getItem("Admin-Token");
  const nav = useNavigate();

//   const filterSubmit = (data) => {
//     setInsuranceData((prev) => [...prev, data]);
//   };


  
console.log(token);

  useEffect(() => {
    

    const fetchInsurances = async () => {
   
      try {
        const response = await axios.get(
          `https://localhost:7063/api/Policy/GetAllPoliciesForAdmin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setInsuranceData(response.data);

        
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
      <button onClick={()=>{setShowFilter(!showFilter)}} style={{width:'fit-content', height:'fit-content'} }>Filter</button>
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
              {item.status==0 && <p className="card-text">
                Your Quota hasn't been viewed by the admin yet
              </p>}
              {item.status==1 && <p className="card-text">
                Your Quota has been viewed by the admin 
              </p>}
              {item.status==2 && <p className="card-text">
                Your Quota has been accepted
              </p>}
              {item.status==3 && <p className="card-text">
                Your Quota has been rejected for a set of reasons pls check the mail
              </p>}
              <a
                className="btn btn-primary"
                onClick={() => {
                  nav("/admin/dashboard/DetailedPolicy", { state: { insurance: item } });
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
