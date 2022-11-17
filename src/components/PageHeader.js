import { Box } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const PageHeader = (props) => {
  const { header } = props;

  return (
    <>
      <Box
        mt={1}
        mb={-1}
        fontSize={28}
        fontWeight="bold"
        css={css`
          font-family: "Courgette", cursive;
          transform: translateX(7.5%);
          text-shadow: -5px 5px 10px black;
        `}
      >
        {header}
      </Box>
      <hr width="100%" />
    </>
  );
};

export default PageHeader;
