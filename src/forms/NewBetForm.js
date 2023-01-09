import { Box } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BET_TYPES } from "../constants";
import { differenceInHours, differenceInMinutes } from "date-fns";
import { useWalletContext } from "../contexts/WalletContext";

const NewBetForm = (props) => {
  const {
    page,
    register,
    formValues: { betOdds, maxBet, minBet, closingTime },
    clock,
    errors,
  } = props;

  const { wallet } = useWalletContext();

  return (
    <>
      {page === 0 && (
        <Box display="flex">
          <select
            id="bet-type"
            {...register("betType", {
              required: "Field is required",
            })}
            css={css`
              background-color: #313131;
              outline: none;
            `}
          >
            {BET_TYPES.map((type) => (
              <option
                key={type}
                value={type.toLowerCase()}
                disabled={type !== "Custom"}
                css={css`
                  text-align: center;
                `}
              >
                {type}
              </option>
            ))}
          </select>
        </Box>
      )}
      {page === 1 && (
        <Box display="flex">
          <textarea
            id="bet-description"
            {...register("betDescription", {
              required: "Field is required",
            })}
            cols={40}
            rows={5}
            autoFocus
            css={css`
              background-color: #313131;
              outline: none;
            `}
          />
        </Box>
      )}
      {page === 2 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <input
            autoComplete="off"
            id="bet-odds"
            type="text"
            autoFocus
            {...register("betOdds", {
              required: "Field is required",
              pattern: {
                value: /^[-+]?\d*\.?(?!0)\d+$/,
                message:
                  "Please only enter numbers above 0 to 1 decimal point!",
              },
              validate: (value) =>
                Number(value) >= 1.1 || "Number must be greater than 1",
            })}
            css={css`
              background-color: #313131;
              outline: none;
              width: 60px;
              text-align: center;
            `}
          />
          {errors?.betOdds && (
            <Box color="red" fontSize={10}>
              {errors?.betOdds?.message}
            </Box>
          )}
        </Box>
      )}
      {page === 3 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <Box
              className="wallet-balance-display-container"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              fontSize={12}
              width="151px"
            >
              <Box color="lightgrey">Wallet Balance</Box>
              <Box color="lightgrey">${wallet?.balance}</Box>
            </Box>
            <Box
              className="maximum-max-bet-display-container"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              fontSize={12}
              width="151px"
            >
              <Box color="lightgrey">MAX(Max Bet)</Box>
              <Box color="lightgrey" fontStyle="italic" whiteSpace="nowrap">
                (wallet balance) / (bet odds)
              </Box>
              <Box color="lightgrey">
                ${Math.floor(wallet?.balance / betOdds)}
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <label htmlFor="bet-max">Max Bet</label>
            <input
              autoComplete="off"
              id="bet-max"
              type="text"
              autoFocus
              {...register("maxBet", {
                required: "Field is required",
                pattern: {
                  value: /^[1-9]\d*$/,
                  message: "Please only enter whole numbers above 0!",
                },
                validate: (value) =>
                  (Number(value) > 0) &
                    (Number(value) <= Math.floor(wallet.balance / betOdds)) ||
                  "Max Bet must be lower or equal to (walletBalance/betOdds)!",
              })}
              css={css`
                background-color: #313131;
                outline: none;
                width: 60px;
                text-align: center;
              `}
            />
            {!!maxBet && (
              <Box color="lightgrey" fontSize={12}>
                max loss: ${maxBet * betOdds - maxBet}
              </Box>
            )}
            {errors?.maxBet && (
              <Box color="red" fontSize={10}>
                {errors?.maxBet?.message}
              </Box>
            )}
          </Box>
        </Box>
      )}
      {page === 4 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Box
            className="max-players-display-container"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            fontSize={12}
          >
            <Box color="lightgrey">Max Number of players</Box>
            <Box color="lightgrey">
              {Math.floor(maxBet / minBet) === Infinity ||
              isNaN(Math.floor(maxBet / minBet))
                ? "N.A"
                : Math.floor(maxBet / minBet)}
            </Box>
          </Box>
          <Box
            className="min-max-bet-inputs-container"
            display="flex"
            gap={3}
            alignItems="center"
            justifyContent="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              <label htmlFor="bet-min">Min Bet</label>
              <input
                autoComplete="off"
                id="bet-min"
                type="text"
                autoFocus
                {...register("minBet", {
                  required: "Field is required",
                  pattern: {
                    value: /^[1-9]\d*$/,
                    message: "Please only enter whole numbers above 0!",
                  },
                  validate: (value) => {
                    return (
                      (Number(value) > 0 && Number(value) <= maxBet) ||
                      "Min Bet cannot exceed Max Bet!"
                    );
                  },
                })}
                css={css`
                  background-color: #313131;
                  outline: none;
                  width: 60px;
                  text-align: center;
                `}
              />
              {errors?.minBet && (
                <Box color="red" fontSize={10}>
                  {errors?.minBet?.message}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
      {page === 5 && (
        <Box
          className="bet-expiry-container"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={5}
        >
          <Box
            className="bet-closing-time-input-container"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <label htmlFor="bet-closing-time">Closing Time</label>
            <input
              autoComplete="off"
              id="bet-closing-time"
              type="datetime-local"
              {...register("closingTime", {
                required: "Field is required",
                validate: (value) => {
                  const diffInHours = differenceInHours(new Date(value), clock);
                  if (diffInHours < 1) {
                    return "Date/Time must be at least one hour from the current time";
                  }
                  return null;
                },
              })}
              css={css`
                background-color: #313131;
                outline: none;
                text-align: center;
              `}
            />
            {errors?.closingTime && (
              <Box color="red" fontSize={10}>
                {errors?.closingTime?.message}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default NewBetForm;
