import React, { useState } from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import "./insurance.css";
import { jwtDecode } from "jwt-decode";

export default function InsuranceDetailsForm({ onSubmit }) {
  // State to hold form values
  const [formData, setFormData] = useState({
    coverageType: "",
    coverageStartDate: "",
    coverageEndDate: "",
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.coverageType) newErrors.coverageType = "Coverage Type is required";
    if (!formData.coverageStartDate) newErrors.coverageStartDate = "Coverage Start Date is required";
    if (!formData.coverageEndDate) newErrors.coverageEndDate = "Coverage End Date is required";
    if (new Date(formData.coverageEndDate) <= new Date(formData.coverageStartDate)) {
      newErrors.coverageEndDate = "Coverage End Date must be after the Start Date";
    }
    if (!formData.coverageAmount || formData.coverageAmount <= 0) {
      newErrors.coverageAmount = "Coverage Amount is required and must be positive";
    }
    if (!formData.status || (formData.status !== "0" && formData.status !== "1")) {
      newErrors.status = "Status is required and must be 0 or 1";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    

    const decodedToken = jwtDecode(localStorage.getItem("Auth-Token"));
    const userId = decodedToken.nameid; // Extract userId from JWT token
    console.log(userId);
    
    // Append userId to form data
    const formDataWithUserId = {
      ...formData,
      UserID: userId, // Add userId to form data
    };

    console.log(formDataWithUserId);
    onSubmit(formDataWithUserId); // Pass form data to parent component
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput
              id="coverageType"
              label="Coverage Type"
              name="coverageType"
              value={formData.coverageType}
              onChange={handleChange}
              invalid={!!errors.coverageType}
              validationError={errors.coverageType}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              type="date"
              id="coverageStartDate"
              label="Coverage Start Date"
              name="coverageStartDate"
              value={formData.coverageStartDate}
              onChange={handleChange}
              invalid={!!errors.coverageStartDate}
              validationError={errors.coverageStartDate}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              type="date"
              id="coverageEndDate"
              label="Coverage End Date"
              name="coverageEndDate"
              value={formData.coverageEndDate}
              onChange={handleChange}
              invalid={!!errors.coverageEndDate}
              validationError={errors.coverageEndDate}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          
          
        </MDBRow>
        <MDBBtn type="submit">
          Submit Insurance Policy
        </MDBBtn>
      </form>
    </div>
  );
}
