import React from "react";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const WithdrawTab = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      width="90vw"
    >
      <Box
        sx={{
          textAlign: "center",
          alignItems: "center",
        }}
      >
        Please allow up to 3 working days to process your withdrawal request
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>1. Withdraw to</Box>
        <TextField
          required
          {...register("accountNumber")}
          label="Account Number"
          variant="outlined"
          margin="normal"
          fullWidth
          color="warning"
          // sx={{ color: "white" }}
        />
        <Box>2. Withdrawal Amount</Box>
        <TextField
          {...register("withdrawalAmount")}
          required
          label="withdrawal amount"
          variant="outlined"
          margin="normal"
          fullWidth
          color="warning"
          // sx={{ color: "white" }}
        />

        <Button variant="contained" type="submit" disabled={!isValid}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default WithdrawTab;
