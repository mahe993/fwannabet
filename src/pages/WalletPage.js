import { Box } from "@mui/material";
import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import WithdrawTab from "../tabs/WithdrawTab";
import TopUpTab from "../tabs/TopUpTab";
import BackdropLoading from "../components/BackdropLoading";

const WalletPage = () => {
  const [backDropOpen, setBackDropOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Wallet" />
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => {
            setTabValue(newValue);
          }}
          centered
          TabIndicatorProps={{ sx: { backgroundColor: "red" } }}
          textColor="inherit"
        >
          <Tab label="Top Up" />
          <Tab label="Withdrawal" />
        </Tabs>
        <Box>
          {tabValue === 0 ? (
            <TopUpTab setBackDropOpen={setBackDropOpen} />
          ) : (
            <WithdrawTab setBackDropOpen={setBackDropOpen} />
          )}
        </Box>

        <BackdropLoading backDropOpen={backDropOpen} />
      </Box>
    </Box>
  );
};

export default WalletPage;
