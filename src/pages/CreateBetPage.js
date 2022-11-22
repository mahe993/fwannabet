import { Box } from "@mui/material";
import React from "react";
import DateAndTime from "../components/DateAndTime";
import PageHeader from "../components/PageHeader";

const CreateBetPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Create" />
      <Box className="date-time-row" width="95vw">
        <DateAndTime />
      </Box>
      <Box
        color="orange" // orange to indicate TBD. remove when you start developing
      >
        Insert ultra complicated CreateBetForm here
      </Box>
    </Box>
  );
};

export default CreateBetPage;
