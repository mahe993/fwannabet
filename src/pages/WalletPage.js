import { Box } from "@mui/material";
import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { TabPanel, a11yProps } from "../constants";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import WithdrawTab from "../tabs/WithdrawTab";
import TopUpTab from "../tabs/TopUpTab";
import { useWalletContext } from "../contexts/WalletContext";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const WalletPage = () => {
  const [value, setValue] = useState(0);
  const { wallet, setWallet } = useWalletContext();

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Wallet" />

      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Top Up" {...a11yProps(0)} />
          <Tab label="Withdrawal" {...a11yProps(1)} />
        </Tabs>
        <Box
          sx={{
            fontSize: 20,
            textAlign: "center",
            alignItems: "center",
          }}
        >
          Balance: S${wallet.balance}
        </Box>
        <TabPanel value={value} index={0}>
          <TopUpTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WithdrawTab />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default WalletPage;
