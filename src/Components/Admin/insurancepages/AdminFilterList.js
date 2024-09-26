import axios from "axios";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const AdminFilterList = () => {
  const token = localStorage.getItem("Admin-Token");
  console.log((token));
  
  const nav = useNavigate();
  const location = useLocation();
  const status = useParams().no;
  const { list } = location.state;
  const completed = list.filter((lists) => lists.status == status);
  console.log(completed);
  console.log(status);

  const handleAccept = async (item) => {
    try {
      const response = await axios.post(
        `https://localhost:7063/api/Policy/PolicyAccepted/${item.policyID}`,
        {}, // Sending an empty object as body since your endpoint doesn’t require it
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response.data); // Log the response data if needed
    } catch (error) {
      console.log(error);
    }
  };
  


  const handleReject = async (item) => {
    try {
      const response = await axios.post(
        `https://localhost:7063/api/Policy/PolicyRejected/${item.policyID}`,
        {}, // Sending an empty object as body since your endpoint doesn’t require it
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response.data); // Log the response data if needed
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {completed.map((item, index) => (
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
                  nav("/admin/dashboard/DetailedPolicy", {
                    state: { insurance: item },
                  });
                }}
              >
                Show Details
              </a>
              {item.status != 4 && (
                <div className="button-container">
                  <a
                    className="btn btn-primary"
                    onClick={() => {
                      handleAccept(item);
                    }}
                  >
                    Accept policy{" "}
                  </a>
                  <a
                    className="btn btn-primary"
                    onClick={() => {
                      handleReject(item);
                    }}
                  >
                    Reject policy
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
