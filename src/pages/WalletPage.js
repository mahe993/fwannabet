import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";

const WalletPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Wallet" />
      Wallet put up here
    </Box>
  );
};

export default WalletPage;
