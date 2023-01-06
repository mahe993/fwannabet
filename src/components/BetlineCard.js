import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const BetlineCard = (props) => {
  const [betAmount, setBetAmount] = useState(0);

  const {
    details: {
      betDescription,
      betOdds,
      minBet,
      maxBet,
      closingTime,
      verificationTime,
      betStatus,
    },
  } = props;

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    setBetAmount(minBet);
  }, []);

  return (
    <Box
      border={1}
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        className="bet-description"
        color={
          betStatus === "open"
            ? "lightgreen"
            : betStatus === "closed"
            ? "orange"
            : "grey"
        }
        textAlign="center"
        fontSize={12}
        p={1}
      >
        {betDescription}
      </Box>
      <hr
        css={css`
          width: 100%;
        `}
      />
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          width="65px"
          color={(betStatus !== "open" || betStatus === "verified") && "grey"}
          ml={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box color="inherit" fontSize={10} fontStyle="italic">
            PAYOUT
          </Box>
          <Box color="inherit">1 : {betOdds}</Box>
        </Box>
        <Box
          height="48px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            disabled={betAmount === minBet}
            onClick={() => setBetAmount((prev) => prev - minBet)}
          >
            <ArrowCircleDownIcon
              css={css`
                color: ${betAmount === minBet ? "grey" : "red"};
              `}
            />
          </Button>
          <input
            value={`$${betAmount}`}
            autoComplete="off"
            type="text"
            disabled
            {...register("betAmount", {
              required: "Field is required",
            })}
            css={css`
              background-color: #313131;
              outline: none;
              width: 60px;
              text-align: center;
              height: 40px;
              color: ${(betStatus !== "open" || betStatus === "verified") &&
              "grey"};
            `}
          />
          <Button
            disabled={betStatus !== "open" || betAmount + minBet > maxBet}
            onClick={() => setBetAmount((prev) => prev + minBet)}
          >
            <ArrowCircleUpIcon
              css={css`
                color: ${betStatus !== "open" || betAmount === maxBet
                  ? "grey"
                  : "lightgreen"};
              `}
            />
          </Button>
        </Box>
        <Box width="65px" mr={1}>
          <Button
            variant="contained"
            disabled={betStatus !== "open" || minBet > maxBet}
            onClick={() =>
              console.log(
                "add bet to bet table, reduce wallet balance, increase on hold, reduce maxBet. check if minBet > maxBet, close the bet"
              )
            }
          >
            BET
          </Button>
        </Box>
      </Box>
      {betStatus === "open" && (
        <Box
          fontSize={12}
          display="flex"
          gap={0.5}
          width="100%"
          justifyContent="center"
        >
          <Box width="60%" textAlign="right" pb={0.5}>
            Potential Winnings:
          </Box>
          <Box width="40%" pb={0.5}>
            ${betAmount * betOdds}
          </Box>
        </Box>
      )}
      {betStatus === "closed" && (
        <>
          <Box
            fontSize={12}
            gap={0.5}
            width="100%"
            textAlign="center"
            pb={0.5}
            color="orange"
          >
            Bet closed. Awaiting verification!
          </Box>
          <Box mb={0.5}>
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={() => console.log("open dialog asking who won")}
            >
              Verify
            </Button>
          </Box>
        </>
      )}
      {betStatus === "verified" && (
        <Box
          fontSize={12}
          gap={0.5}
          width="100%"
          textAlign="center"
          pb={0.5}
          color="grey"
        >
          Bet Verified!
        </Box>
      )}
    </Box>
  );
};

export default BetlineCard;
