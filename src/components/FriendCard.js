import { Box } from "@mui/material";
import React from "react";


const FriendCard = (props) => {
  const { user } = props;
  // const name = user.name;
  // const status = user.status;
  const status = "pending";

  const FriendRequestButtons = () => {
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
  };

  const UnfriendButton = () => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box component="typography">We're friends!</Box>
        <Box component="button" sx={{ bgcolor: "red", mt: 1, ml: 1, p: 0.5 }}>
          Unfriend
        </Box>
      </Box>
    );
  };

  const AddFriend = () => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box component="button" sx={{ bgcolor: "green", mt: 1, ml: 1, p: 0.5 }}>
          Add friend
        </Box>
      </Box>
    );
  };

  const PendingAcceptance = () => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box component="typography">Friend request sent! Pending...</Box>
      </Box>
    );
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
        // to be replaced with getPicture
        <img
          src={`https://picsum.photos/100
          `}
        />
      </Box>
      <Box sx={{ m: 1 }}>
        <Box component="typography">Name: John Doe</Box>
        {/* <Box component="typography">Name: {name}</Box> */}
        {status === "invited" && <FriendRequestButtons />}
        {status === "approved" && <UnfriendButton />}
        {status === "pending" && <PendingAcceptance />}
        {status === null && <AddFriend />}
      </Box>
    </Box>
  );
};

export default FriendCard;
