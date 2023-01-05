import { Box } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BET_TYPES } from "../constants";

const NewBetForm = (props) => {
  const { page, register } = props;
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
    </>
  );
};

export default NewBetForm;
