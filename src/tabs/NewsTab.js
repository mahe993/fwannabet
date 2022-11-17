import { Box } from "@mui/material";
import React from "react";

const NewsTab = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="95vw"
      gap={1}
    >
      <Box
        textAlign="center"
        color="red" // red to indicate to develop when there is time. remove when start developing.
      >
        We are actively working to bring you the main sports news of the day!
        <br />
        <br /> Keep an eye out for this page!
      </Box>
    </Box>
  );
};

export default NewsTab;
