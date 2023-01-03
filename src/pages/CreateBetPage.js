import React, { useState } from "react";
import { Box } from "@mui/material";
import CreateBetFirstStep from "../components/CreateBetFirstStep";
import CreteBetStepper from "../components/CreateBetStepper";
import DateAndTime from "../components/DateAndTime";
import PageHeader from "../components/PageHeader";
import CreateBetSecondStep from "../components/CreateBetSecondStep";

const CreateBetPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [betType, setBetType] = useState("");

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Create Bet" />
      <Box className="date-time-row" width="95vw">
        <DateAndTime />
      </Box>
      <Box>
        <CreteBetStepper activeStep={activeStep} />
      </Box>
      <Box>
        {activeStep === 0 && (
          <CreateBetFirstStep
            setActiveStep={setActiveStep}
            setBetType={setBetType}
          />
        )}
        {activeStep === 1 && <CreateBetSecondStep betType={betType} />}
      </Box>
    </Box>
  );
};

export default CreateBetPage;
