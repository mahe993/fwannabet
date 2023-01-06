/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import DateAndTime from "../components/DateAndTime";
import PageHeader from "../components/PageHeader";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { PAGE_INSTRUCTIONS, PAGE_STEPS } from "../constants";
import NewBetForm from "../forms/NewBetForm";
import { useForm } from "react-hook-form";
import CreateBetPageButtons from "../components/CreateBetPageButtons";
import { differenceInHours } from "date-fns";

const CreateBetPage = () => {
  const [clock, setClock] = useState(new Date());
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
    formState: { isValid, errors },
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
    } else {
      setFormValues((prev) => {
        return { ...prev, betOdds: "" };
      });
    }
  }, [watch("betOdds")]);

  // when max bet changes, update overall form
  useEffect(() => {
    let val = getValues("maxBet");
    if (val[0] === "0") return;
    if (val.indexOf(".") > 0) {
      val = getValues("maxBet").slice(0, val.indexOf("."));
    }
    const max = Number(val);
    if (max > 0) {
      setFormValues((prev) => {
        return { ...prev, maxBet: max };
      });
    } else {
      setFormValues((prev) => {
        return { ...prev, maxBet: "" };
      });
    }
  }, [watch("maxBet")]);

  // when min bet changes, update overall form
  useEffect(() => {
    let val = getValues("minBet");
    if (val[0] === "0") return;
    if (val.indexOf(".") > 0) {
      val = getValues("minBet").slice(0, val.indexOf("."));
    }
    const min = Number(val);
    if (min > formValues?.maxBet) {
      return setFormValues((prev) => {
        return { ...prev, minBet: "" };
      });
    }
    if (min > 0) {
      setFormValues((prev) => {
        return { ...prev, minBet: min };
      });
    } else {
      setFormValues((prev) => {
        return { ...prev, minBet: "" };
      });
    }
  }, [watch("minBet")]);

  // when bet closing time changes, update overall form and reset verification time
  useEffect(() => {
    const diffInHours = differenceInHours(
      new Date(getValues("closingTime")),
      clock
    );
    if (diffInHours < 1) {
      setFormValues((prev) => {
        return {
          ...prev,
          closingTime: "",
          verificationTime: "",
        };
      });
    } else {
      setFormValues((prev) => {
        return {
          ...prev,
          closingTime: getValues("closingTime"),
          verificationTime: "",
        };
      });
    }
  }, [watch("closingTime")]);

  // when bet verification time changes, update overall form
  useEffect(() => {
    // find a way to validate verificationTime >= closingTime
    setFormValues((prev) => {
      return { ...prev, verificationTime: getValues("verificationTime") };
    });
  }, [watch("verificationTime")]);

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Create" />
      <Box className="date-time-row" width="95vw">
        <DateAndTime clock={clock} setClock={setClock} />
      </Box>
      <Box className="bet-page-stepper-container" width="95vw">
        <Stepper activeStep={page} alternativeLabel>
          {PAGE_STEPS.map((label, idx) => (
            <Step key={label}>
              <StepLabel StepIconProps={{ fontSize: "small" }}>
                <Box color={page === idx ? "red" : "lightgrey"} fontSize={12}>
                  {label}
                </Box>
                {label === "Bet Odds" && (
                  <Box
                    color={page === idx ? "red" : "lightgreen"}
                    fontSize={12}
                    minHeight="17.2px"
                  >
                    {formValues?.betOdds && `1:${formValues?.betOdds}`}
                  </Box>
                )}
                {label === "Max Bet" && formValues?.maxBet && (
                  <Box
                    color={page === idx ? "red" : "lightgreen"}
                    fontSize={12}
                    minHeight="17.2px"
                  >
                    ${formValues?.maxBet}
                  </Box>
                )}
                {label === "Min Bet" && formValues?.minBet && (
                  <Box
                    color={page === idx ? "red" : "lightgreen"}
                    fontSize={12}
                    minHeight="17.2px"
                  >
                    ${formValues?.minBet}
                  </Box>
                )}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box
        className="bet-page-container"
        width="100%"
        height="65vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box className="bet-instructions" mt={2}>
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
        <Box className="bet-form">
          <NewBetForm
            page={page}
            setPage={setPage}
            register={register}
            formValues={formValues}
            clock={clock}
            errors={errors}
            isValid={isValid}
          />
        </Box>
        <Box className="bet-buttons" display="flex" gap={1}>
          <CreateBetPageButtons
            page={page}
            setPage={setPage}
            createBet={createBet}
            isValid={isValid}
            formValues={formValues}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateBetPage;
