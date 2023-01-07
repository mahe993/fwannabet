import { Box } from "@mui/material";
import React from "react";
import { useWalletContext } from "../contexts/WalletContext";

const WalletBalanceDisplay = () => {
  const { wallet } = useWalletContext();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      fontSize={20}
      textAlign="center"
      width="100%"
    >
      <Box display="flex" width="100%" justifyContent="center" gap={1}>
        <Box width="50%" textAlign="end" color="lightgrey">
          Balance:
        </Box>
        <Box width="50%" textAlign="start" color="lightgrey">
          S$ {wallet?.balance.toFixed(2)}
        </Box>
      </Box>
      <Box display="flex" width="100%" justifyContent="center" gap={1}>
        <Box width="50%" textAlign="end" color="lightgrey">
          On Hold:
        </Box>
        <Box width="50%" textAlign="start" color="lightgrey">
          S$ {wallet?.onHold.toFixed(2)}
        </Box>
      </Box>
    </Box>
  );
};

export default WalletBalanceDisplay;
