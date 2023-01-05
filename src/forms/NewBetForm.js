import { Box } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BET_TYPES } from "../constants";

const NewBetForm = (props) => {
  const { page, register, formValues } = props;
  return (
    <>
      {page === 0 && (
        <Box display="flex">
          <select
            {...register("betType")}
            id="cars"
            css={css`
              background-color: #313131;
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
    </>
  );
};

export default NewBetForm;
