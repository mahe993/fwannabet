import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";

const TopUpTab = () => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          1. Transfer from account
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
        </Box>
        <Box>
          2. Select a transfer method
          <Box gap={1}>
            <TextField
              fullWidth
              select
              defaultValue="Internet Banking"
              {...register("transferMethod")}
            >
              <MenuItem value={"Internet Banking"}>Internet Banking</MenuItem>
              <MenuItem value={"Telegraphic Transfer"}>
                Telegraphic Transfer
              </MenuItem>
            </TextField>
          </Box>
        </Box>

        <Box>
          3. Make a transfer to WannaBet
          <Box>
            <p>Bank XXX</p>
            <p>Name WannaBet Pte Ltd</p>
            <p>Account Number XXXXXX-XXX</p>
          </Box>
        </Box>
        <Box>
          4. How much
          <TextField
            {...register("amount")}
            required
            label="Amount"
            variant="outlined"
            margin="normal"
            fullWidth
            color="warning"
            // sx={{ color: "white" }}
          />
        </Box>

        <Box>5. Photo of receipt</Box>
        <Button variant="contained" type="submit" disabled={!isValid}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default TopUpTab;
