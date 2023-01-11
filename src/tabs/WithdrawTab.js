import React from "react";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useWalletContext } from "../contexts/WalletContext";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import WalletBalanceDisplay from "../components/WalletBalanceDisplay";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const WithdrawTab = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { setWallet } = useWalletContext();

  const { setBackDropOpen, setAlertMessage, setSnackBarOpen } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      // Retrieve access token
      const accessToken = await getAccessTokenSilently();
      const postWallet = await axios({
        method: "POST",
        url: `${BACKEND_URL}/wallets/withdraw/${user.sub}`,
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { balance: Number(data.withdrawalAmount) },
      });
      // set wallet with updated changes
      setWallet(postWallet.data);
      // close backdrop loading animation
      setBackDropOpen(false);
      // reset form
      reset();
      // open snackbar
      setAlertMessage("Balance withdrawal successful");
      setSnackBarOpen(true);
    } catch (e) {
      throw new Error(e);
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
      <WalletBalanceDisplay />
      <Box textAlign="center" fontSize={14} color="grey" fontStyle="italic">
        Please allow up to 3 working days to process your withdrawal request
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Box
            className="withdrawal-account-number-input-container"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <label
              htmlFor="withdrawal-account-number"
              css={css`
                font-size: 14px;
              `}
            >
              1. Withdraw to account
            </label>
            <input
              type="text"
              autoComplete="off"
              id="withdrawal-account-number"
              placeholder="0012345566789"
              {...register("withdrawalAccountNumber", {
                required: "Field is required!",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please only enter numbers!",
                },
              })}
              css={css`
                background-color: #313131;
                padding: 3px;
                outline: none;
                text-align: center;
                ::placeholder {
                  font-size: 12px;
                  font-style: italic;
                }
              `}
            />
            {errors?.withdrawalAccountNumber && (
              <Box color="red" fontSize={10}>
                {errors?.withdrawalAccountNumber?.message}
              </Box>
            )}
          </Box>
          <Box
            className="withdrawal-amount-input-container"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <label
              htmlFor="withdrawal-amount"
              css={css`
                font-size: 14px;
              `}
            >
              2. Withdrawal Amount
            </label>
            <input
              type="text"
              autoComplete="off"
              id="withdrawal-amount"
              placeholder="888"
              {...register("withdrawalAmount", {
                required: "Field is required!",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please only enter numbers!",
                },
                validate: (value) =>
                  Number(value) > 0 || "Amount must be greater than 0!",
              })}
              css={css`
                background-color: #313131;
                padding: 3px;
                outline: none;
                text-align: center;
                ::placeholder {
                  font-size: 12px;
                  font-style: italic;
                }
              `}
            />
            {errors?.withdrawalAmount && (
              <Box color="red" fontSize={10}>
                {errors?.withdrawalAmount?.message}
              </Box>
            )}
          </Box>
          <Button
            variant="contained"
            type="submit"
            disabled={!isValid}
            onClick={() => setBackDropOpen(true)}
          >
            Withdraw
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default WithdrawTab;
