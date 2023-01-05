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
import { get, useForm } from "react-hook-form";
import CreateBetPageButtons from "../components/CreateBetPageButtons";

const CreateBetPage = () => {
  const [page, setPage] = useState(0);
  const [formValues, setFormValues] = useState({
    betType: "",
    betDescription: "",
    betOdds: "",
    minBet: "",
    maxBet: "",
    closingTime: "",
    verificationTime: "",
  });

  // react hook form
  const {
    register,
    watch,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      betType: "",
      betDescription: "",
      betOdds: "",
      minBet: "",
      maxBet: "",
      closingTime: "",
      verificationTime: "",
    },
  });

  // submit formValues to create betline
  const createBet = async () => {
    console.log("handle submit createBet");
  };

  // when bet type changes, update overall form
  useEffect(() => {
    setFormValues((prev) => {
      return { ...prev, betType: getValues("betType") };
    });
  }, [watch("betType")]);

  // when bet description changes, update overall form
  useEffect(() => {
    setFormValues((prev) => {
      return { ...prev, betDescription: getValues("betDescription") };
    });
  }, [watch("betDescription")]);

  // when bet odds changes, update overall form
  useEffect(() => {
    let truncated = getValues("betOdds");
    if (truncated.indexOf(".") > 0) {
      truncated = getValues("betOdds").slice(0, truncated.indexOf(".") + 2);
    }
    const odds = Number(truncated);
    if (odds >= 1.1) {
      setFormValues((prev) => {
        return { ...prev, betOdds: odds };
      });
    }
  }, [watch("betOdds")]);

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
                <Box color={page === idx && "red"} fontSize={12}>
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
        justifyContent="space-between"
      >
        <Box className="page-instructions" mt={4}>
          {PAGE_INSTRUCTIONS.map((instruction, idx) => (
            <Box
              key={instruction}
              display={page !== idx ? "none" : "flex"}
              textAlign="center"
              color="lightgrey"
              fontStyle="italic"
              fontSize={12}
              whiteSpace="pre-wrap"
            >
              {instruction}
            </Box>
          ))}
        </Box>
        <Box className="page-form">
          <NewBetForm page={page} setPage={setPage} register={register} />
        </Box>
        <Box className="page-buttons" display="flex" gap={1}>
          <CreateBetPageButtons
            page={page}
            setPage={setPage}
            createBet={createBet}
            isValid={isValid}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateBetPage;
