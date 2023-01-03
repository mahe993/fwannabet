import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

//to be put into constant
const steps = ["Step 1", "Step 2", "Step 3"];

const CreteBetStepper = (props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={props.activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CreteBetStepper;
