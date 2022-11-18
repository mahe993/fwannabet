import { Box } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const FormLabel = (props) => {
  const { label } = props;

  return (
    <>
      <Box textAlign="left">{label}</Box>
    </>
  );
};

export default FormLabel;
