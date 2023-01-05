import { Box } from "@mui/material";
import React, { useState } from "react";
import DateAndTime from "../components/DateAndTime";
import PageHeader from "../components/PageHeader";

const CreateBetPage = () => {
  const [page, setPage] = useState(0);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Create" />
      <Box className="date-time-row" width="95vw">
        <DateAndTime />
      </Box>
      <Box
        className="page-container"
        width="100%"
        height="55vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box className="page-instructions">Instructions</Box>
        <Box className="page-form">input</Box>
        <Box className="">back button/submit button</Box>
      </Box>
    </Box>
  );
};

export default CreateBetPage;
