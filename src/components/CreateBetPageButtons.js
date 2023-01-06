import { Button } from "@mui/material";
import React from "react";

const CreateBetPageButtons = (props) => {
  const { page, setPage, createBet, isValid } = props;
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
          disabled={!isValid}
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
