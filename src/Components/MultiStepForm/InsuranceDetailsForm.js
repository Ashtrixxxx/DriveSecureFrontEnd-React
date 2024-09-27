import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import "./insurance.css";
import {jwtDecode} from "jwt-decode"; // Use correct import for jwtDecode

export default function InsuranceDetailsForm({ onSubmit, vehicle }) {
  // State to hold form values
  const [formData, setFormData] = useState({
    coverageType: "",
    coverageStartDate: "",
    coverageEndDate: "",
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});
  const [insuranceAmount, setInsuranceAmount] = useState(0);

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

    return newErrors;
  };

  // Calculate the insurance amount based on form and vehicle details
  const calculateAmount = () => {
    if (!vehicle || !formData.coverageStartDate || !formData.coverageEndDate) return 0;
  
    const coverageRates = {
      self: 0.005, // Adjusted to 0.5%
      thirdParty: 0.005, // Adjusted to 0.5%
      theft: 0.01, // Remains at 1%
    };
  
    const start = new Date(formData.coverageStartDate);
    const end = new Date(formData.coverageEndDate);
    const coverageDuration = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  
    let seatModifier = vehicle.numberOfSeats > 5 ? 1.1 : 1.0; // Adjusted seat modifier
    let serviceHistoryModifier = vehicle.serviceHistory === "good" ? 0.9 : 1.1;
    let ownerModifier = vehicle.numberOfPreviousOwners > 1 ? 1.05 : 1.0; // Adjusted owner modifier
  
    const baseVehicleValue = parseFloat(vehicle.listPrice);
    let baseInsuranceAmount = baseVehicleValue * (coverageRates[formData.coverageType] || 0.005); // Adjusted to 0.5%
  
    let totalInsuranceAmount = baseInsuranceAmount * seatModifier * serviceHistoryModifier * ownerModifier * (coverageDuration / 365);
  
    return (totalInsuranceAmount).toFixed(2); // Return amount in Indian Rupees
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const decodedToken = jwtDecode(localStorage.getItem("Auth-Token"));
    const userId = decodedToken.nameid; // Extract userId from JWT token

    // Append userId to form data
    const formDataWithUserId = {
      ...formData,
      UserID: userId,
      insuranceAmount: insuranceAmount, // Add insurance amount to form data
    };

    onSubmit(formDataWithUserId); // Pass form data to parent component
  };

  // Update insurance amount whenever form data or vehicle data changes
  useEffect(() => {
    const amount = calculateAmount();
    setInsuranceAmount(amount);
  }, [formData, vehicle]);

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <MDBRow className="mb-4">
          <MDBCol>
            <label htmlFor="coverageType">Coverage Type</label>
            <select
              id="coverageType"
              name="coverageType"
              className="form-control"
              value={formData.coverageType}
              onChange={handleChange}
            >
              <option value="">Select Coverage Type</option>
              <option value="self">Self</option>
              <option value="thirdParty">Third Party</option>
              <option value="theft">Theft</option>
            </select>
            {errors.coverageType && <div className="text-danger">{errors.coverageType}</div>}
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
          <MDBCol>
            <MDBInput
              label="Calculated Insurance Amount (in cents)"
              value={insuranceAmount}
              readOnly
            />
          </MDBCol>
        </MDBRow>

        <MDBBtn type="submit">
          Submit Insurance Policy
        </MDBBtn>
      </form>
    </div>
  );
}
