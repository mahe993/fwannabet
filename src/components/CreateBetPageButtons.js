import { Button } from "@mui/material";
import React from "react";

const CreateBetPageButtons = (props) => {
  const { page, setPage, createBet } = props;
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
      {page !== 2 && (
        <Button
          variant="contained"
          onClick={() => setPage((currPage) => currPage + 1)}
        >
          Next
        </Button>
      )}
      {page === 2 && (
        <Button
          variant="contained"
          // disabled={condition} truthy if any formValueKey == ""
          onClick={() => {
            createBet();
          }}
        >
          Submit
        </Button>
      )}
    </>
  );
};

export default CreateBetPageButtons;
