import { Box } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BET_TYPES } from "../constants";

const NewBetForm = (props) => {
  const {
    page,
    register,
    formValues: { betOdds, maxBet, minBet },
  } = props;
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
        <input
          autoComplete="off"
          id="bet-odds"
          type="text"
          autoFocus
          {...register("betOdds", {
            required: "Field is required",
            pattern: {
              value: /^[-+]?\d*\.?(?!0)\d+$/,
              message: "Please only enter numbers!",
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
            className="wallet-balance-display-container"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            fontSize={12}
          >
            <Box color="lightgrey">Wallet Balance</Box>
            <Box color="lightgrey">${`balanceAmt`}</Box>
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
                  message: "Please only enter whole numbers!",
                },
                validate: (value) => Number(value) > 0, // validate number greater than 0 and lower than walletBalance/betOdds
              })}
              css={css`
                background-color: #313131;
                outline: none;
                width: 60px;
                text-align: center;
              `}
            />
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
              {Math.floor(maxBet / minBet) === Infinity
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
                    message: "Please only enter whole numbers!",
                  },
                  validate: (value) => {
                    return Number(value) > 0 && Number(value) <= maxBet;
                  },
                })}
                css={css`
                  background-color: #313131;
                  outline: none;
                  width: 60px;
                  text-align: center;
                `}
              />
            </Box>
          </Box>
        </Box>
      )}
      {page === 5 && (
        <Box
          className="bet-expiry-container"
          display="flex"
          flexDirection="colummn"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            className="bet-closing-time-input-container"
            display="flex"
            flexDirection="colummn"
            alignItems="center"
            justifyContent="center"
          >
            <label htmlFor="bet-closing-time">Bet Closing Time</label>
            <input
              autoComplete="off"
              id="bet-closing-time"
              type="datetime-local"
              autoFocus
              {...register("closingTime", {
                required: "Field is required",
              })}
              css={css`
                background-color: #313131;
                outline: none;
                text-align: center;
              `}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default NewBetForm;
