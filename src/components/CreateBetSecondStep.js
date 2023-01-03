import { Box } from "@mui/system";
import React from "react";
import CreateBetPolls from "./CreateBetPolls";

const CreateBetSecondStep = (props) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      {props.betType === "Polls" && <CreateBetPolls />}
    </Box>
  );
};

export default CreateBetSecondStep;
