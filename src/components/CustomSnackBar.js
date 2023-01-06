import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CustomSnackBar = (props) => {
  const { snackBarOpen, setSnackBarOpen, alertMessage } = props;

  return (
    <Snackbar
      open={snackBarOpen}
      autoHideDuration={2000}
      onClose={() => setSnackBarOpen(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;
