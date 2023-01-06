import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const CreateBetPageButtons = (props) => {
  const [disable, setDisable] = useState(false);
  const {
    page,
    setPage,
    createBet,
    isValid,
    formValues: { closingTime, verificationTime },
  } = props;

  // extra check to make sure closingTime and verificationTime fields are not ""
  useEffect(() => {
    if (!closingTime || !verificationTime) {
      setDisable(true);
    } else if (!!closingTime && !!verificationTime) {
      setDisable(false);
    }
  }, [closingTime, verificationTime]);

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
          disabled={!isValid || disable}
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
