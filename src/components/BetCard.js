import { Box } from "@mui/material";
import React from "react";

const BetCard = (props) => {
  const {
    details: {
      betAmount,
      betline: { betStatus, betDescription, betOdds },
    },
  } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      border={1}
      borderColor={
        betStatus === "open"
          ? "lightgreen"
          : betStatus === "closed"
          ? "orange"
          : "gray"
      }
    >
      <Box
        className="bet-description"
        color={
          betStatus === "open"
            ? "lightgreen"
            : betStatus === "closed"
            ? "orange"
            : "gray"
        }
        textAlign="center"
        fontSize={12}
        p={1}
      >
        {betDescription}
      </Box>
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          width="65px"
          color="lightgrey"
          ml={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box color="inherit" fontSize={10} fontStyle="italic">
            PAYOUT
          </Box>
          <Box color="inherit" whiteSpace="nowrap">
            1 : {betOdds}
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box
            color="lightgrey"
            fontSize={10}
            fontStyle="italic"
            whiteSpace="nowrap"
          >
            Bet Amount
          </Box>
          <Box color="lightgrey" whiteSpace="nowrap">
            ${betAmount.toFixed(2)}
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap={0.5}
          alignItems="center"
          mr={1}
        >
          <Box
            color="lightgrey"
            fontSize={10}
            fontStyle="italic"
            whiteSpace="nowrap"
          >
            Potential Winnings
          </Box>
          <Box color="lightgrey" whiteSpace="nowrap">
            ${(betAmount * betOdds).toFixed(2)}
          </Box>
        </Box>
      </Box>
      <Box
        className="bet-status-message"
        color={
          betStatus === "open"
            ? "lightgreen"
            : betStatus === "closed"
            ? "orange"
            : "gray"
        }
        textAlign="center"
        fontSize={12}
        fontStyle="italic"
        p={1}
      >
        {betStatus === "open" && "This bet is still open! All the best!"}
        {betStatus === "closed" && "Bet is closed! Awaiting verifiation..."}
        {betStatus === "house" && `You lost $${betAmount.toFixed(2)}`}
        {betStatus === "player" &&
          `You won $${(betAmount * betOdds).toFixed(2)}`}
      </Box>
    </Box>
  );
};

export default BetCard;
