import { Box } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";

const FriendCard = (props) => {
  const { user } = props;

  return (
    <Box
      color="orange" // orange to indicate TBD. remove when you start developing
      sx={{
        display: "flex",
        flexWrap: "wrap",
        boxShadow: 3,
      }}
    >
      <Box>
        <img
          src={`https://picsum.photos/100
          `}
        />
      </Box>
      <Box sx={{ m: 1 }}>
        <Box component="typography">Name: John Doe</Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="button"
            color="black"
            sx={{ bgcolor: "green", mt: 1, p: 0.5 }}
          >
            Accept Friend Request
          </Box>
          <Box component="button" sx={{ bgcolor: "red", mt: 1, ml: 1, p: 0.5 }}>
            Decline
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FriendCard;
