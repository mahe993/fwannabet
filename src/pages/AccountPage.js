import { Box } from "@mui/material";
import React from "react";
import PageHeader from "../components/PageHeader";

const AccountPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Account" />
    </Box>
  );
};

export default AccountPage;
