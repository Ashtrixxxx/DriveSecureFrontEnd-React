import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const FilteredInsurance = () => {
  const nav = useNavigate()
    const location = useLocation();
  const status = useParams().no;
  const { list } = location.state;
  const completed = list.filter(lists => lists.status == status);
  console.log(completed);
  console.log(status)

  
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
  )
}
