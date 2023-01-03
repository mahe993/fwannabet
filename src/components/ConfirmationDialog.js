import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

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
        id="error-dialog"
      >
        <DialogTitle id="error-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="error-dialog-description">
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