import { Box } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import MessageIcon from "@mui/icons-material/Message";
import { useAuth0 } from "@auth0/auth0-react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const FriendCardButtons = (props) => {
  const { connectionStatus, requestee, requestor } = props;

  const { user } = useAuth0();

  return (
    <>
      {connectionStatus === "accepted" && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <MessageIcon onClick={() => console.log("message action")} />
          <PersonRemoveIcon
            color="warning"
            onClick={() => console.log("remove friend action")}
          />
        </Box>
      )}
      {connectionStatus === "pending" && requestor === user.sub && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <CancelIcon
            color="warning"
            onClick={() => console.log("cancel invite action")}
          />
          <Box color="orange" fontSize={10} fontStyle="italic">
            Cancel Invite
          </Box>
        </Box>
      )}
      {connectionStatus === "pending" && requestee === user.sub && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <CheckCircleIcon
            color="success"
            onClick={() => console.log("accept friend request action")}
          />
          <DoDisturbOnIcon
            color="warning"
            onClick={() => console.log("reject friend request action")}
          />
        </Box>
      )}
      {!connectionStatus && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <PersonAddIcon
            color="success"
            onClick={() => console.log("add friend action")}
          />
          <Box fontSize={10} fontStyle="italic" color="darkgreen">
            Add Friend
          </Box>
        </Box>
      )}
    </>
  );
};

export default FriendCardButtons;
