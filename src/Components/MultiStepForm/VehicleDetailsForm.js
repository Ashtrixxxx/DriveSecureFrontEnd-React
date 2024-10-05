import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { jwtDecode } from "jwt-decode";
import { MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import "./forms.css";

// Define validation schema using yup
const schema = yup.object({
  vehicleType: yup.string().required("Vehicle Type is required"),
  vehicleModel: yup.string().required("Vehicle Model is required"),
  engineNumber: yup.string().required("Engine Number is required"),
  engineType: yup.string().required("Engine Type is required"),
  yearOfManufacture: yup.number().required("Year of Manufacture is required").min(1900).max(new Date().getFullYear()),
  numberOfSeats: yup.number().required("Number of Seats is required").positive().integer(),
  fuelType: yup.string().required("Fuel Type is required"),
  listPrice: yup.number().required("List Price is required"),
  licensePlateNumber: yup.string().required("License Plate Number is required"),
  vehicleCondition: yup.string().required("Vehicle Condition is required"),
  serviceHistory: yup.string().required("Service History is required"),
  lastServiceDate: yup.date().required("Last Service Date is required").max(new Date(), "Date cannot be in the future"),
  vin: yup.string().required("Vehicle Identification Number is required"),
  transmissionType: yup.string().required("Transmission Type is required"),
  numberOfPreviousOwners: yup.number().required("Number of Previous Owners is required").min(0).integer(),
  registrationDate: yup.date().required("Registration Date is required").max(new Date(), "Date cannot be in the future"),
}).required();

export default function VehicleDetailsForm({ onSubmit, type }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onFormSubmit = (data) => {
    const decodedToken = jwtDecode(localStorage.getItem("Auth-Token"));
    const userId = decodedToken.nameid; // Extract userId from JWT token

    // Append userId to form data
    const formDataWithUserId = {
      ...data,
      UserID: userId, // Add userId to form data
    };

    console.log(formDataWithUserId);
    onSubmit(formDataWithUserId); // Pass form data to parent component
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput
              id="vehicleType"
              label="Vehicle Type"
              value={type.type.VehicleType}
              readOnly
              {...register("vehicleType")}
              invalid={!!errors.vehicleType}
              validationError={errors.vehicleType?.message}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              id="vehicleModel"
              label="Vehicle Model"
              {...register("vehicleModel")}
              invalid={!!errors.vehicleModel}
              validationError={errors.vehicleModel?.message}
            />
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              type="number"
              id="engineNumber"
              label="Engine Number"
              {...register("engineNumber")}
              invalid={!!errors.engineNumber}
              validationError={errors.engineNumber?.message}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              id="engineType"
              label="Engine Type"
              {...register("engineType")}
              invalid={!!errors.engineType}
              validationError={errors.engineType?.message}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              type="number"
              id="yearOfManufacture"
              label="Year of Manufacture"
              {...register("yearOfManufacture")}
              invalid={!!errors.yearOfManufacture}
              validationError={errors.yearOfManufacture?.message}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              type="number"
              id="numberOfSeats"
              label="Number of Seats"
              {...register("numberOfSeats")}
              invalid={!!errors.numberOfSeats}
              validationError={errors.numberOfSeats?.message}
            />
          </MDBCol>

          {/* Replaced Fuel Type Dropdown with select */}
          <MDBCol>
            <select
              id="fuelType"
              className="form-control"
              {...register("fuelType")}
            >
              <option value="">Select Fuel Type</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
            </select>
            {errors.fuelType && <div className="text-danger">{errors.fuelType.message}</div>}
          </MDBCol>

          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              id="listPrice"
              label="List Price"
              {...register("listPrice")}
              invalid={!!errors.listPrice}
              validationError={errors.listPrice?.message}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              id="licensePlateNumber"
              label="License Plate Number"
              {...register("licensePlateNumber")}
              invalid={!!errors.licensePlateNumber}
              validationError={errors.licensePlateNumber?.message}
            />
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              id="vehicleCondition"
              label="Vehicle Condition"
              {...register("vehicleCondition")}
              invalid={!!errors.vehicleCondition}
              validationError={errors.vehicleCondition?.message}
            />
          </MDBCol>

          {/* Replaced Service History Dropdown with select */}
          <MDBCol>
            <select
              id="serviceHistory"
              className="form-control"
              {...register("serviceHistory")}
            >
              <option value="">Select Service History</option>
              <option value="good">Good</option>
              <option value="bad">Bad</option>
            </select>
            {errors.serviceHistory && <div className="text-danger">{errors.serviceHistory.message}</div>}
          </MDBCol>

          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              type="date"
              id="lastServiceDate"
              label="Last Service Date"
              max={new Date().toISOString().split("T")[0]} 
              {...register("lastServiceDate")}
              invalid={!!errors.lastServiceDate}
              validationError={errors.lastServiceDate?.message}
            />
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              id="vin"
              type="number"

              label="Vehicle Identification Number"
              {...register("vin")}
              invalid={!!errors.vin}
              validationError={errors.vin?.message}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              id="transmissionType"
              label="Transmission Type"
              {...register("transmissionType")}
              invalid={!!errors.transmissionType}
              validationError={errors.transmissionType?.message}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              type="number"
              id="numberOfPreviousOwners"
              label="Number of Previous Owners"
              {...register("numberOfPreviousOwners")}
              invalid={!!errors.numberOfPreviousOwners}
              validationError={errors.numberOfPreviousOwners?.message}
            />
          </MDBCol>
        </MDBRow>

        <MDBInput
          wrapperClass="mb-4"
          type="date"
          id="registrationDate"
          max={new Date().toISOString().split("T")[0]} 
          label="Registration Date"
          {...register("registrationDate")}
          invalid={!!errors.registrationDate}
          validationError={errors.registrationDate?.message}
        />

        <button className="mb-4" type="submit" block>
          Submit Vehicle Details
        </button>
      </form>
    </div>
  );
}
