import { Box } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";

const FriendCard = (props) => {
  const { user } = props;

  // 2 different status - pending, accepted
  // Pending can be pending acceptance or inviting

  //for testing
  const status = "accepted";

  const ReflectStatus = (status) => {
    if (status === "pending") {
      return (
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
      );
    } else if (status === "accepted") {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box>We're friends!</Box>
          <Box component="button" sx={{ bgcolor: "red", mt: 1, ml: 1, p: 0.5 }}>
            Unfriend
          </Box>
        </Box>
      );
    }
  };

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
          alt="profile-pic"
        />
      </Box>
      <Box sx={{ m: 1 }}>
        <Box>Name: John Doe</Box>
        {ReflectStatus(status)}
      </Box>
    </Box>
  );
};

export default FriendCard;
