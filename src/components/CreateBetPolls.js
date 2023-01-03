import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

const CreateBetPolls = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box width="70vw">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          required
          {...register("value1", {})}
          label="Label1"
          variant="outlined"
          margin="normal"
          fullWidth
          color="warning"
          // sx={{ color: "white" }}
        />
        <Box className="validation-error">{errors.value1?.message}</Box>
        <TextField
          {...register("value2", {})}
          label="Label2"
          variant="outlined"
          margin="normal"
          fullWidth
          color="warning"
          // sx={{ color: "white" }}
        />
        <Box className="validation-error">{errors.value2?.message}</Box>
        <Button variant="contained" type="submit" disabled={!isValid}>
          Save
        </Button>
      </form>
    </Box>
  );
};

export default CreateBetPolls;
