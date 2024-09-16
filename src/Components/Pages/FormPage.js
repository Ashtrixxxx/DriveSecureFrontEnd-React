import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import HorizontalLinearStepper from "../MultiStepForm/HorizontalLinearStepper";
import { Navbar } from "../Navbar/Navbar";


const FormPage = () => {
  return (
    <div className="form">
        <Navbar/>
          <HorizontalLinearStepper />
        
    </div>
  );
};

export default FormPage;
