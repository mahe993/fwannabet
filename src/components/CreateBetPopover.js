import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import CreateBetPage from "../pages/CreateBetPage";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Backdrop from "@mui/material/Backdrop";

const CreateBetPopover = () => {
  const [open, setOpen] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  return (
    <div>
      <AddCircleIcon onClick={(e) => setOpen(e.currentTarget)} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!!open}
      >
        <CreateBetPage setOpen={setOpen} />
      </Backdrop>
    </div>
  );
};

export default CreateBetPopover;
