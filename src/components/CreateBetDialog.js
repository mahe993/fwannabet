import React, { useState } from "react";
import CreateBetPage from "../pages/CreateBetPage";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Dialog } from "@mui/material";

const CreateBetDialog = () => {
  const [openBetDialog, setOpenBetDialog] = useState(false);

  return (
    <>
      <AddCircleIcon onClick={() => setOpenBetDialog(true)} />
      <Dialog
        open={openBetDialog}
        onClose={() => {
          setOpenBetDialog(false);
        }}
      >
        <CreateBetPage setOpenBetDialog={setOpenBetDialog} />
      </Dialog>
    </>
  );
};

export default CreateBetDialog;
