import React from "react";
import { useLocation } from "react-router-dom";
import "./DetailInsurance.css";
export const DetailedInsurance = () => {
  const location = useLocation();
  const data = location.state?.insurance;
  console.log(data);

  return (
    <div>
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
    </div>
  );
};
