import { Box } from "@mui/material";
import React from "react";
import DateAndTime from "../components/DateAndTime";
import PageHeader from "../components/PageHeader";
import CloseIcon from "@mui/icons-material/Close";
import CreateBetForms from "../components/CreateBetForms";

const CreateBetPage = (props) => {
  const { setOpenBetDialog } = props;
  return (
    <Box backgroundColor="#313131" textAlign="right">
      <CloseIcon
        onClick={() => {
          setOpenBetDialog(false);
        }}
      />
      <Box
        color="white"
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
        <Box>
          <CreateBetForms />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateBetPage;
