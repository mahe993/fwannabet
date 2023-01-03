import { Box } from "@mui/system";
import React from "react";

//to be put into constant
const betOptions = ["Polls", "Custom Bet", "Sport Bet"];

const CreateBetFirstStep = (props) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Box>Select type of bets</Box>
      {betOptions.map((option, index) => (
        <Box
          key={index}
          onClick={() => {
            props.setActiveStep(1);
            props.setBetType(option);
          }}
          sx={{
            width: 250,
            height: 30,
            textAlign: "center",
            alignItems: "center",
            border: "1px dashed grey",
          }}
        >
          {option}
        </Box>
      ))}
    </Box>
  );
};

export default CreateBetFirstStep;
