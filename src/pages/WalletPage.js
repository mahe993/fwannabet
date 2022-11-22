import { Box } from "@mui/material";
import React from "react";
import PageHeader from "../components/PageHeader";

const WalletPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Wallet" />
    </Box>
  );
};

export default WalletPage;
