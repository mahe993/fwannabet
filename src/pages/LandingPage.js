import React from "react";
import { Box, Button } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import AnimatedWords from "../components/AnimatedWords";

const LandingPage = () => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="92vh"
      alignItems="center"
    >
      <Box
        fontSize={34}
        fontWeight="bold"
        css={css`
          font-family: "Courgette", cursive;
        `}
      >
        WannaBet™
      </Box>
      <Box className="app-description" textAlign="center" mt={2}>
        Welcome
        <br />
        <br />
        <Box textAlign="justify" pl={2} pr={2} fontSize={14}>
          This is the place where you can make bets on anything, and everything!
          From the weather, to what color your friend's underpants is.
          <br />
          <br />
          All you have to do is to grab a bunch of friends, put some money into
          your wallet, and you can start making your own betting lines. It is
          THAT easy, don't believe us? ...wanna bet?
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            sx={{ height: "30px" }}
            onClick={() => {
              console.log("auth0 login");
            }}
          >
            ENTER
          </Button>
        </Box>
        <Box className="animated-words-container">
          <AnimatedWords />
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
