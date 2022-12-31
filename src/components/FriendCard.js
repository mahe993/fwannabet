import { Box } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import noPFP from "../assets/images/noPFP.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import MessageIcon from "@mui/icons-material/Message";

const FriendCard = (props) => {
  const { connection } = props;

  const { user } = useAuth0();

  return (
    <Box
      className="friend-card-container"
      display="flex"
      borderRadius="50px"
      border={1}
      alignItems="center"
      width="95%"
      gap={1}
      fontSize={14}
    >
      <Box
        className="profile-pic-container"
        borderRadius="50px"
        height="100px"
        width="100px"
        overflow="hidden"
      >
        <img
          src={connection?.profilePicture ? connection?.profilePicture : noPFP}
          alt="profile-pic"
          width="100%"
          css={css`
            border-radius: 50px;
          `}
        />
      </Box>
      <Box
        className="friend-details-container"
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="180px"
        height="70px"
        overflow="hidden"
        gap={1.5}
      >
        <Box className="friend-name-container" width="100%" textAlign="center">
          {connection?.username ? connection?.username : connection?.email}
        </Box>
        <Box className="buttons-container" textAlign="center">
          {connection?.status === "accepted" && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
            >
              <MessageIcon onClick={() => console.log("message action")} />
              <PersonRemoveIcon
                onClick={() => console.log("remove friend action")}
              />
            </Box>
          )}
          {connection?.status === "pending" &&
            connection?.requestee !== user.sub && (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <CancelIcon
                  color="error"
                  onClick={() => console.log("cancel invite action")}
                  css={css`
                    cursor: pointer;
                  `}
                />
                <Box fontSize={10} fontStyle="italic">
                  Cancel Invite
                </Box>
              </Box>
            )}
          {connection?.status === "pending" &&
            connection?.requestor !== user.sub && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
              >
                <CheckCircleIcon
                  onClick={() => console.log("accept friend request action")}
                />
                <DoDisturbOnIcon
                  onClick={() => console.log("reject friend request action")}
                />
              </Box>
            )}
          {!connection?.status && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <PersonAddIcon
                color="success"
                onClick={() => console.log("add friend action")}
                css={css`
                  cursor: pointer;
                `}
              />
              <Box fontSize={10} fontStyle="italic">
                Add Friend
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FriendCard;
