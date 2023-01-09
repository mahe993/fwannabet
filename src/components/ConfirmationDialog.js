import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const ConfirmationDialog = (props) => {
  const {
    openConfirmationDialog,
    setOpenConfirmationDialog,
    confirmationDialogContent,
    dialogButtonAction,
    setDialogButtonAction,
  } = props;

  const handleClose = () => {
    setDialogButtonAction("");
    setOpenConfirmationDialog(false);
  };

  return (
    <>
      <Dialog
        open={openConfirmationDialog}
        onClose={handleClose}
        id="confirmation-dialog"
      >
        <DialogContent>
          <DialogContentText
            id="confirmation-dialog-description"
            css={css`
              white-space: pre-wrap;
            `}
          >
            {confirmationDialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={
              dialogButtonAction ? dialogButtonAction.confirm : handleClose
            }
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;
