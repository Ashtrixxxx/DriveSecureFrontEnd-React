import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VehicleDetailsForm from "./VehicleDetailsForm"; // Update import paths as needed
import PaymentDetailsForm, { LoginForm } from "./PaymentDetailsForm";
import InsuranceDetailsForm, { RegistrationForm } from "./InsuranceDetailsForm";
import "./stepper.css";
import SupportDetailsForm from "./SupportDetailsForm";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const steps = [
  "Enter Vehicle Details",
  "Enter Insurance Coverage Details",
  "Upload Your Support Documents",
];

export default function HorizontalLinearStepper(type) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [vehicleFormData, setVehicleFormData] = React.useState({});
  const [insuranceFormData, setInsuranceFormData] = React.useState({});
  const [paymentFormData, setPaymentFormData] = React.useState({});
  const [supportFormData, setSupportFormData] = React.useState({});
  const [UserID, setUserID] = useState(null);
  const nav = useNavigate();
  const token = localStorage.getItem("Auth-Token");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserID(decodedToken.nameid);
    }
  });

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = async () => {
    setActiveStep(0);

    const PaymentCompletionDto = {
      Vehicle: {
        VehicleType: vehicleFormData.vehicleType,
        VehicleModel: vehicleFormData.vehicleModel,
        EngineNumber: vehicleFormData.engineNumber,
        EngineType: vehicleFormData.engineType,
        YearOfManufacture: vehicleFormData.yearOfManufacture,
        NumberOfSeats: vehicleFormData.numberOfSeats,
        FuelType: vehicleFormData.fuelType,
        ListPrice: vehicleFormData.listPrice.toString(),
        LicensePlateNumber: vehicleFormData.licensePlateNumber,
        VehicleCondition: vehicleFormData.vehicleCondition,
        ServiceHistory: vehicleFormData.serviceHistory,
        LastServiceDate: new Date(vehicleFormData.lastServiceDate)
          .toISOString()
          .split("T")[0], // ISO format yyyy-MM-dd
        VehicleIdentificationNumber: parseInt(vehicleFormData.vin), // Updated VIN to match VehicleIdentificationNumber
        TransmissionType: vehicleFormData.transmissionType,
        NumberOfPreviousOwners: vehicleFormData.numberOfPreviousOwners,
        RegistrationDate: new Date(vehicleFormData.registrationDate)
          .toISOString()
          .split("T")[0], // ISO format yyyy-MM-dd
        UserID: parseInt(vehicleFormData.UserID),
      },
      PolicyDetails: {
        CoverageType: insuranceFormData.coverageType,
        CoverageStartDate: new Date(insuranceFormData.coverageStartDate)
          .toISOString()
          .split("T")[0], // ISO format yyyy-MM-dd
        CoverageEndDate: new Date(insuranceFormData.coverageEndDate)
          .toISOString()
          .split("T")[0], // ISO format yyyy-MM-dd
        CoverageAmount: insuranceFormData.insuranceAmount,
        UserID: parseInt(insuranceFormData.UserID),
        IsRenewed: insuranceFormData.isRenewed || false, // Default to false if not provided
        Status: 0,
      },
      SupportDocuments: {
        AddressProof: supportFormData.addressProofUrl,
        RCProof: supportFormData.rcProofUrl,
        UserID: parseInt(supportFormData.UserID),
      },
    };

    console.log(PaymentCompletionDto);

    try {
      const response = await axios.post(
        `https://localhost:7063/api/User/OnFormSubmission/${UserID}`,
        PaymentCompletionDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      nav("/");
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        // If the error is 400 or 401, navigate to 'Not Authorized' page
        nav("/not-authorized");
      } else {
        console.log("An error occurred", error);
      }
    
    }
  };

  const handleVehicleFormSubmit = (data) => {
    setVehicleFormData(data);
    console.log(data);
    console.log("vehicle");

    handleNext(); // Move to the next step after form submission
  };

  const handleInsuranceFormSubmit = (data) => {
    setInsuranceFormData(data);
    console.log(data);
    console.log("insurance");

    handleNext(); // Move to the next step after form submission
  };

  const handlePaymentFormSubmit = (data) => {
    setPaymentFormData(data);
    console.log(data);
    console.log("Payment");

    handleNext(); // Move to the next step after form submission
  };

  const handleSupportFormSubmit = (data) => {
    setSupportFormData(data);
    console.log(data);

    handleNext(); // Move to the next step after form submission
  };

  return (
    <div className="my-div">
      <Box className="stepper-container" sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Confirm Submission</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <VehicleDetailsForm
                onSubmit={handleVehicleFormSubmit}
                type={type}
              />
            )}
            {activeStep === 1 && (
              <InsuranceDetailsForm
                onSubmit={handleInsuranceFormSubmit}
                vehicle={vehicleFormData}
              />
            )}
            {activeStep === 2 && (
              <SupportDetailsForm onSubmit={handleSupportFormSubmit} />
            )}
            {/* {activeStep === 3 && <PaymentDetailsForm onSubmit={handlePaymentFormSubmit} insurance={insuranceFormData} vehicle={vehicleFormData} />} */}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
