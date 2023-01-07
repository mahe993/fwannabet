import React from "react";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useWalletContext } from "../contexts/WalletContext";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";

const WithdrawTab = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { setWallet } = useWalletContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    console.log(data.amount);
    try {
      // Retrieve access token
      const accessToken = await getAccessTokenSilently();
      const postWallet = await axios({
        method: "POST",
        url: `${BACKEND_URL}/wallets/${user.sub}/withdraw`,
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { balance: data.amount },
      });
      // get the setUserDetails from usercontext
      setWallet(postWallet.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      width="90vw"
    >
      <Box
        sx={{
          textAlign: "center",
          alignItems: "center",
        }}
      >
        Please allow up to 3 working days to process your withdrawal request
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>1. Withdraw to</Box>
        <TextField
          required
          {...register("accountNumber")}
          label="Account Number"
          variant="outlined"
          margin="normal"
          fullWidth
          color="warning"
          // sx={{ color: "white" }}
        />
        <Box>2. Withdrawal Amount</Box>
        <TextField
          {...register("amount")}
          required
          label="withdrawal amount"
          variant="outlined"
          margin="normal"
          fullWidth
          color="warning"
          // sx={{ color: "white" }}
        />

        <Button variant="contained" type="submit" disabled={!isValid}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default WithdrawTab;
