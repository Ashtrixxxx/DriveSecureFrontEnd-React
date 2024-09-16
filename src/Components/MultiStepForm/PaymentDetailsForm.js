import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";

// Define validation schema using yup
const schema = yup
  .object({
    premiumAmount: yup
      .number()
      .required("Premium Amount is required")
      .positive(),
    paymentDate: yup
      .date()
      .required("Payment Date is required")
      .max(new Date(), "Payment Date cannot be in the future"),
    paymentMethod: yup
      .string()
      .required("Payment Method is required")
      .max(50, "Payment Method can't exceed 50 characters"),
  })
  .required();

export default function PaymentDetailsForm({ onSubmit, insurance, vehicle }) {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // To programmatically set values if needed
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [amount, setAmount] = useState(0);

  // Handle form submission
  const onFormSubmit = (data) => {
    if (!insurance || !vehicle) {
      alert("Please complete the necessary details before making a payment.");
      return;
    }
    console.log(data);
    onSubmit(data); // Pass form data to parent component
  };

  useEffect(() => {
    console.log(insurance+""+ vehicle);
    
    if (insurance && vehicle) {
      const amt = calculateAmount(insurance, vehicle);
      setAmount(amt);
    }
  }, [insurance, vehicle]);

  const calculateAmount = (i, v) => {
    const coverageRates = {
      self: 0.02, // 2% of vehicle's value
      thirdParty: 0.01, // 1% of vehicle's value
      theft: 0.015, // 1.5% of vehicle's value
    };

    const start = new Date(i.coverageStartDate);
    const end = new Date(i.coverageEndDate);
    const coverageDuration = Math.max(
      1,
      Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    );

    let seatModifier = v.numberOfSeats > 5 ? 1.2 : 1.0; // Extra cost for larger vehicles
    let serviceHistoryModifier = v.serviceHistory === "good" ? 0.9 : 1.1; // Discount for good history
    let ownerModifier = v.numberOfPreviousOwners > 1 ? 1.15 : 1.0; // Extra cost for multiple owners

    const baseVehicleValue = v.listPrice; // Corrected variable name
    let baseInsuranceAmount =
      baseVehicleValue * (coverageRates[i.coverageType] || 0.01); // Default to third party rate

    let totalInsuranceAmount =
      baseInsuranceAmount *
      seatModifier *
      serviceHistoryModifier *
      ownerModifier *
      (coverageDuration / 365);

    return totalInsuranceAmount.toFixed(2);
  };

  const isEmpty = (obj) => obj && Object.keys(obj).length === 0;

  if (insurance == null || vehicle == null || isEmpty(insurance) || isEmpty(vehicle)) {
    return <h1>Fill in the necessary details to make payment</h1>;
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <MDBRow className="mb-4">
          <MDBCol>
            <p>Premium Amount: ${amount}</p>
          </MDBCol>
        </MDBRow>

        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput
              id="paymentDate"
              label="Payment Date"
              type="date"
              {...register("paymentDate")}
              invalid={!!errors.paymentDate}
              validationError={errors.paymentDate?.message}
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput
              id="paymentMethod"
              label="Payment Method"
              {...register("paymentMethod")}
              invalid={!!errors.paymentMethod}
              validationError={errors.paymentMethod?.message}
            />
          </MDBCol>
        </MDBRow>

        <MDBBtn type="Make Payment" block>
          Pay Now
        </MDBBtn>
      </form>
    </div>
  );
}
