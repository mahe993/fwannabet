import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const DateAndTime = () => {
  const [clock, setClock] = useState(new Date().toString());

  // show clock on mount.
  useEffect(() => {
    const time = setInterval(() => {
      setClock(new Date().toString());
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
      <Box color="lightgrey">{clock.slice(0, 16)}</Box>
      <Box color="lightgrey">{clock.slice(16, 24)}</Box>
    </Box>
  );
};

export default DateAndTime;
