import { Box } from "@mui/material";
import React from "react";
import DateAndTime from "../components/DateAndTime";
import PageHeader from "../components/PageHeader";
import CloseIcon from "@mui/icons-material/Close";
import CreateBetForms from "../components/CreateBetForms";

const CreateBetPage = (props) => {
  return (
    <Box textAlign="right">
      <CloseIcon
        onClick={() => {
          props.setOpen(null);
        }}
      />
      <Box
        color="white"
        backgroundColor="#313131"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        width="80vw"
        height="75vh"
      >
        <PageHeader header="Create Bet" />
        {/* <Box className="date-time-row" width="95vw">
          <DateAndTime />
        </Box> */}
        <Box
          color="orange" // orange to indicate TBD. remove when you start developing
        >
          <CreateBetForms />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateBetPage;
