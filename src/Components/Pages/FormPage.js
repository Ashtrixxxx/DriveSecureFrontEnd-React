import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import HorizontalLinearStepper from "../MultiStepForm/HorizontalLinearStepper";
import { Navbar } from "../Navbar/Navbar";
import { useParams } from "react-router-dom";


const FormPage = () => {
  const VehicleType = useParams();

  return (
    <div className="form">
        <Navbar/>
          <HorizontalLinearStepper type={VehicleType} />
        
    </div>
  );
};

export default FormPage;
