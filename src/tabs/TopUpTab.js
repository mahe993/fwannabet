import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useWalletContext } from "../contexts/WalletContext";
import { BACKEND_URL, TRANSFER_METHODS } from "../constants.js";
import axios from "axios";
import WalletBalanceDisplay from "../components/WalletBalanceDisplay";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const TopUpTab = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { setWallet } = useWalletContext();

  const { setBackDropOpen, setAlertMessage, setSnackBarOpen } = props;

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      // Retrieve access token
      const accessToken = await getAccessTokenSilently();
      const postWallet = await axios({
        method: "POST",
        url: `${BACKEND_URL}/wallets/topup/${user.sub}`,
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { balance: Number(data.topUpAmount) },
      });
      // set wallet details to updated details
      setWallet(postWallet.data);
      // close back drop loading animation
      setBackDropOpen(false);
      // reset form
      reset();
      // open snackbar
      setAlertMessage("Balance Top-up successful");
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          {/* <Box
            className="account-number-input-container"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <label
              htmlFor="account-number"
              css={css`
                font-size: 14px;
              `}
            >
              1. Transfer from account
            </label>
            <input
              type="text"
              autoComplete="off"
              id="account-number"
              placeholder="0012345566789"
              {...register("accountNumber", {
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
            {errors?.accountNumber && (
              <Box color="red" fontSize={10}>
                {errors?.accountNumber?.message}
              </Box>
            )}
          </Box> */}
          <Box
            className="transfer-method-input-container"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <label
              htmlFor="transfer-method"
              css={css`
                font-size: 14px;
              `}
            >
              1. Select a transfer method
            </label>
            <select
              id="transfer-method"
              defaultValue="bankTransfer"
              {...register("transferMethod", {
                required: "Field is required!",
              })}
              css={css`
                background-color: #313131;
                padding: 3px;
                outline: none;
                text-align: center;
              `}
            >
              {TRANSFER_METHODS.map((method) => (
                <option
                  key={method?.value}
                  value={method?.value}
                  disabled={method?.value !== "bankTransfer"}
                  css={css`
                    text-align: center;
                  `}
                >
                  {method.label}
                </option>
              ))}
            </select>
            {errors?.transferMethod && (
              <Box color="red" fontSize={10}>
                {errors?.transferMethod?.message}
              </Box>
            )}
          </Box>
          <Box
            className="transfer-details-container"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box color="grey" fontWeight="bold">
              Transfer Details
            </Box>
            <Box color="grey" fontStyle="italic" fontSize={13}>
              WannaBet Pte Ltd
            </Box>
            <Box color="grey" fontStyle="italic" fontSize={13}>
              Account Number 006-7891-234
            </Box>
          </Box>
          <Box
            className="top-up-input-container"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <label
              htmlFor="top-up"
              css={css`
                font-size: 14px;
              `}
            >
              2. Top Up Amount {`(S$)`}
            </label>
            <input
              type="text"
              autoComplete="off"
              id="top-up"
              placeholder="888"
              {...register("topUpAmount", {
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
            {errors?.topUpAmount && (
              <Box color="red" fontSize={10}>
                {errors?.topUpAmount?.message}
              </Box>
            )}
          </Box>
          <Button
            variant="contained"
            type="submit"
            disabled={!isValid}
            onClick={() => setBackDropOpen(true)}
          >
            Top UP
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TopUpTab;
