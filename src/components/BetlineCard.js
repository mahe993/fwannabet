import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useWalletContext } from "../contexts/WalletContext";
import ConfirmationDialog from "./ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import BackdropLoading from "../components/BackdropLoading";

const BetlineCard = (props) => {
  const [betAmount, setBetAmount] = useState(0);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [confirmationDialogContent, setConfirmationDialogContent] =
    useState("");
  const [dialogButtonAction, setDialogButtonAction] = useState("");
  const [backDropOpen, setBackDropOpen] = useState(false);

  const { wallet, setWallet } = useWalletContext();
  const { user: authUser, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const {
    details: {
      betDescription,
      betOdds,
      minBet,
      maxBet,
      closingTime, // use this to automatically close open bets on mount
      verificationTime, // use this to notify user to verify bets on mount
      betStatus,
      user, // contains username and email
      userId, // betline owner
      id, // betline id
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

  // upon clicking bet button
  const handleBetClick = () => {
    // ensure wallet balance >= bet amount
    if (wallet?.balance < betAmount) {
      // set confirmation dialog to show wallet balance, show bet amount
      setConfirmationDialogContent(
        `You do not have enough money to make this bet!\n\nWallet Balance: $${(wallet?.balance).toFixed(
          2
        )}\nBet Amount: $${betAmount.toFixed(
          2
        )}\n\nEither reduce bet amount or click "Confirm" to go top up funds!`
      );
      // open confirmationDialog
      setOpenConfirmationDialog(true);
      // set dialog confirm button to close dialog and go to wallet page
      setDialogButtonAction({
        confirm: () => {
          setOpenConfirmationDialog(false);
          navigate("/wallet");
        },
      });
    } else {
      // set confirmation dialog to show balance, bet amount
      setConfirmationDialogContent(`Wallet Balance: $${(wallet?.balance).toFixed(
        2
      )}\nBet Amount: $${betAmount.toFixed(
        2
      )}\n\nThis will move $${betAmount.toFixed(
        2
      )} from your wallet balance to on hold. This action is irreversible until the bet is completed. Click "confirm" to proceed!
      `);
      // open confirmationDialog
      setOpenConfirmationDialog(true);
      // set dialog confirm button to close dialog, start backdrop loading animation and run betAction
      setDialogButtonAction({
        confirm: () => {
          setOpenConfirmationDialog(false);
          setBackDropOpen(true);
          console.log("welldone");
        },
      });
    }
  };

  // betting action
  const betAction = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      // create new bet
      // new bet should update specific betline's maxbet to remove by betamount
      // move bettor's wallet balance to onhold by betAmount
      // setWallet details

      // stop backdrop loading animation
      // navigate to My Bets page
    } catch (err) {
      throw new Error(err);
    }
  };

  // on mount set the minimum bet on the bet card
  useEffect(() => {
    setBetAmount(minBet);
  }, []);

  return (
    <>
      <Box
        border={1}
        borderColor={
          betStatus === "open"
            ? "lightgreen"
            : betStatus === "closed"
            ? "orange"
            : "gray"
        }
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          className="bet-owner"
          color="lightgrey"
          textAlign="center"
          fontSize={12}
          p={1}
        >
          {user?.username ? user?.username : user?.email}
        </Box>
        <hr
          css={css`
            width: 100%;
          `}
        />
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
            color={betStatus !== "open" ? "gray" : "lightgrey"}
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
                  color: ${betAmount === minBet ? "gray" : "red"};
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
                    ? "gray"
                    : "lightgreen"};
                `}
              />
            </Button>
          </Box>
          <Box width="65px" mr={1}>
            <Button
              variant="contained"
              disabled={betStatus !== "open" || minBet > maxBet}
              onClick={handleBetClick}
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
            <Box width="59%" textAlign="right" pb={0.5} color="lightgrey">
              Potential Winnings:
            </Box>
            <Box width="41%" pb={0.5} color="lightgrey">
              ${(betAmount * betOdds).toFixed(2)}
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
                disabled={userId !== authUser.sub}
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
            color="gray"
          >
            Bet Verified!
          </Box>
        )}
      </Box>
      <ConfirmationDialog
        openConfirmationDialog={openConfirmationDialog}
        setOpenConfirmationDialog={setOpenConfirmationDialog}
        confirmationDialogContent={confirmationDialogContent}
        dialogButtonAction={dialogButtonAction}
        setDialogButtonAction={setDialogButtonAction}
      />
      <BackdropLoading backDropOpen={backDropOpen} />
    </>
  );
};

export default BetlineCard;
