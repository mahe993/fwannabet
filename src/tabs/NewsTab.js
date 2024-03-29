import { Box } from "@mui/material";
import React from "react";

const NewsTab = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="95%"
      gap={1}
    >
      <Box
        textAlign="center"
        color="red"
        fontSize={14}
        fontStyle="italic"
        p={2}
      >
        We are actively working to bring you the main sports news of the day!
        <br />
        <br /> Keep an eye out for this page!
      </Box>
    </Box>
  );
};

export default NewsTab;
