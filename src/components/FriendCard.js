import { Box } from "@mui/material";
import React from "react";

const FriendCard = (props) => {
  const { user } = props;

  return (
    <Box
      color="orange" // orange to indicate TBD. remove when you start developing
    >
      this component takes in user prop which we can use to render a card with
      the user info with the appropriate buttons
    </Box>
  );
};

export default FriendCard;
