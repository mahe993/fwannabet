import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useWalletContext } from "../contexts/WalletContext";

const CreateBetPageButtons = (props) => {
  const [disable, setDisable] = useState(false);
  const {
    page,
    setPage,
    createBet,
    isValid,
    formValues: { closingTime, verificationTime, betOdds, maxBet },
    setBackDropOpen,
    setOpenConfirmationDialog,
    setConfirmationDialogContent,
    setDialogButtonAction,
  } = props;

  const { wallet } = useWalletContext();

  // handle create button
  const handleCreate = () => {
    setConfirmationDialogContent(
      `Creating this bet will move $${(betOdds * maxBet).toFixed(
        2
      )} from your wallet balance to on hold.\n\nYour remaining balance will be $${(
        wallet.balance -
        betOdds * maxBet
      ).toFixed(2)}.\n\nThis move is irreversible, click confirm to create!`
    );
    setDialogButtonAction({
      confirm: () => {
        setBackDropOpen(true);
        createBet();
        setOpenConfirmationDialog(false);
      },
    });
    setOpenConfirmationDialog(true);
  };

  // extra check to make sure closingTime and verificationTime fields are not ""
  useEffect(() => {
    if (!closingTime || !verificationTime) {
      setDisable(true);
    } else if (!!closingTime && !!verificationTime) {
      setDisable(false);
    }
  }, [closingTime, verificationTime]);

  return (
    <>
      {page !== 0 && (
        <Button
          variant="contained"
          onClick={() => setPage((currPage) => currPage - 1)}
        >
          Back
        </Button>
      )}
      {page !== 5 && (
        <Button
          variant="contained"
          onClick={() => setPage((currPage) => currPage + 1)}
          disabled={!isValid}
        >
          Next
        </Button>
      )}
      {page === 5 && (
        <Button
          variant="contained"
          disabled={!isValid || disable}
          onClick={handleCreate}
        >
          Create
        </Button>
      )}
    </>
  );
};

export default CreateBetPageButtons;
