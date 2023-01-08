import { Box } from "@mui/material";
import React, { useEffect } from "react";

const DateAndTime = (props) => {
  const { clock, setClock } = props;

  // show clock on mount.
  useEffect(() => {
    const time = setInterval(() => {
      setClock(new Date());
    }, 1000);
    //unsubscribe on dismount
    return () => clearInterval(time);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width="inherit"
      fontSize={12}
    >
      <Box color="gray">{clock.toString().slice(0, 16)}</Box>
      <Box color="gray">{clock.toString().slice(16, 24)}</Box>
    </Box>
  );
};

export default DateAndTime;
