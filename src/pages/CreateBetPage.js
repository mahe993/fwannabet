import React from "react";
import { Box } from "@mui/material";

import PageHeader from "../components/PageHeader";

const CreateBetPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Create Bet" />
    </Box>
  );
};

export default CreateBetPage;
