import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const VerificationDialog = (props) => {
  const {
    openVerificationDialog,
    setOpenVerificationDialog,
    setBackDropOpen,
    houseWinner,
    playerWinner,
  } = props;

  const handleClose = () => {
    setOpenVerificationDialog(false);
  };

  return (
    <>
      <Dialog
        open={openVerificationDialog}
        onClose={handleClose}
        id="verification-dialog"
      >
        <DialogContent
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            background-color: black;
            margin: 0;
            padding: 0;
          `}
        >
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={() => {
              setBackDropOpen(true);
              houseWinner();
            }}
          >
            HOUSE
          </Button>
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={() => {
              setBackDropOpen(true);
              playerWinner();
            }}
          >
            PLAYER
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VerificationDialog;
