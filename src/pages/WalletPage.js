import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import PageHeader from "../components/PageHeader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import WithdrawTab from "../tabs/WithdrawTab";
import TopUpTab from "../tabs/TopUpTab";
import BackdropLoading from "../components/BackdropLoading";
import CustomSnackBar from "../components/CustomSnackBar";
import { useWalletContext } from "../contexts/WalletContext";

const WalletPage = () => {
  const [backDropOpen, setBackDropOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { setWallet } = useWalletContext();

  const { user, getAccessTokenSilently } = useAuth0();

  const getWallet = async (signal) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const walletDetails = await axios({
        method: "GET",
        url: `${BACKEND_URL}/wallets/getwallet/${user.sub}/${user.email}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: signal,
      });
      setWallet(walletDetails.data);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log("wallet data fetch aborted");
      } else {
        throw new Error(err);
      }
    }
  };

  // on mount get all betlines owned by friends
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    // get all betlines owned by friends
    getWallet(signal);
    return () => {
      controller.abort();
    };
  }, []);

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
            <TopUpTab
              setBackDropOpen={setBackDropOpen}
              setSnackBarOpen={setSnackBarOpen}
              setAlertMessage={setAlertMessage}
            />
          ) : (
            <WithdrawTab
              setBackDropOpen={setBackDropOpen}
              setSnackBarOpen={setSnackBarOpen}
              setAlertMessage={setAlertMessage}
            />
          )}
        </Box>
        <CustomSnackBar
          snackBarOpen={snackBarOpen}
          setSnackBarOpen={setSnackBarOpen}
          alertMessage={alertMessage}
        />
        <BackdropLoading backDropOpen={backDropOpen} />
      </Box>
    </Box>
  );
};

export default WalletPage;
