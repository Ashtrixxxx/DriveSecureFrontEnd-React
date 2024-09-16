import React from "react";
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
const steps = ["Enter Vehicle Details", "Enter Insurance Coverage Details", "Enter Payment Details", "Upload Your Support Documents"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [vehicleFormData, setVehicleFormData] = React.useState({});
  const [insuranceFormData, setInsuranceFormData] = React.useState({});
  const [paymentFormData, setPaymentFormData] = React.useState({});
  const [supportFormData, setSupportFormData] = React.useState({});


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

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleVehicleFormSubmit = (data) => {
    setVehicleFormData(data);
    console.log(data);
    
    handleNext(); // Move to the next step after form submission
  };

  const handleInsuranceFormSubmit = (data) => {
    setInsuranceFormData(data);
    console.log(data);
    
    handleNext(); // Move to the next step after form submission
  };


  const handlePaymentFormSubmit = (data) => {
    setPaymentFormData(data);
    console.log(data);
    
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
              labelProps.optional = <Typography variant="caption">Optional</Typography>;
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
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && <VehicleDetailsForm onSubmit={handleVehicleFormSubmit} />}
            {activeStep === 1 && <InsuranceDetailsForm  onSubmit= {handleInsuranceFormSubmit}/>}
            {activeStep === 2 && <SupportDetailsForm onSubmit={handleSupportFormSubmit} />}

            {activeStep === 3 && <PaymentDetailsForm onSubmit={handlePaymentFormSubmit} insurance={insuranceFormData} vehicle={vehicleFormData} />}

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
