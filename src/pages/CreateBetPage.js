import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DateAndTime from "../components/DateAndTime";
import PageHeader from "../components/PageHeader";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { PAGE_INSTRUCTIONS, PAGE_STEPS } from "../constants";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import NewBetForm from "../forms/NewBetForm";
import { useForm } from "react-hook-form";

const CreateBetPage = () => {
  const [page, setPage] = useState(0);
  const [formValues, setFormValues] = useState({ betType: "" });

  const { register, watch, getValues } = useForm();

  // when bet type changes, update overall form
  useEffect(() => {
    setFormValues((prev) => {
      return { ...prev, betType: getValues("betType") };
    });
  }, [watch("betType")]);

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Create" />
      <Box className="date-time-row" width="95vw">
        <DateAndTime />
      </Box>
      <Box className="stepper-container" width="95vw">
        <Stepper activeStep={page} alternativeLabel>
          {PAGE_STEPS.map((label, idx) => (
            <Step key={label}>
              <StepLabel>
                <Box color={page === idx && "lightgreen"} fontSize={12}>
                  {label}
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box
        className="page-container"
        width="100%"
        height="65vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={25}
      >
        <Box className="page-instructions">
          {PAGE_INSTRUCTIONS.map((instruction, idx) => (
            <Box
              key={instruction}
              display={page !== idx ? "none" : "flex"}
              textAlign="center"
              color="lightgrey"
              fontStyle="italic"
              fontSize={12}
            >
              {instruction}
            </Box>
          ))}
        </Box>
        <Box className="page-form">
          <NewBetForm
            page={page}
            setPage={setPage}
            register={register}
            formValues={formValues}
          />
        </Box>
        <Box className="page-buttons" display="flex" gap={1}>
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
            >
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CreateBetPage;
