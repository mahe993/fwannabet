import { Box } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import noPFP from "../assets/images/noPFP.jpg";
import { useAuth0 } from "@auth0/auth0-react";

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
      <Box borderRadius="50px" height="100px" width="100px" overflow="hidden">
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
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        width="180px"
        height="60px"
        overflow="hidden"
      >
        <Box className="friend-name-container" width="100%" textAlign="center">
          {connection?.username ? connection?.username : connection?.email}
        </Box>
        <Box
          className="buttons-container"
          width="100%"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          textAlign="center"
        >
          {connection?.status === "accepted" && `Interactive/Unfriend buttons`}
          {connection?.status === "pending" &&
            connection?.requestee !== user.sub &&
            `Awaiting acceptance.../cancel button`}
          {connection?.status === "pending" &&
            connection?.requestor !== user.sub &&
            `Add/Reject buttons`}
        </Box>
      </Box>
    </Box>
  );
};

export default FriendCard;
