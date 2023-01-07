import { Box } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import noPFP from "../assets/images/noPFP.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import FriendCardButtons from "./FriendCardButtons";

const FriendCard = (props) => {
  const {
    connection,
    setLoadingData,
    fetchFriends,
    getValues,
    setSearchResults,
  } = props;

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
          src={
            connection?.profilePicture
              ? connection?.profilePicture?.downloadUrl
              : noPFP
          }
          alt="profile-pic"
          width="100%"
          height="100%"
          css={css`
            border-radius: 50px;
            object-fit: fill;
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
        borderRadius="0px 50px 50px 0px"
      >
        <Box
          className="friend-name-container"
          width="100%"
          textAlign="center"
          color="lightgrey"
        >
          {connection?.username
            ? connection?.username
            : connection?.email.length > 15
            ? `${connection?.email.slice(0, 15)}...`
            : connection?.email}
        </Box>
        <Box className="buttons-container" textAlign="center">
          <FriendCardButtons
            requesteeId={connection?.id}
            connectionStatus={connection?.status}
            requestee={
              connection?.requestee ? connection?.requestee : connection?.id
            }
            requestor={connection?.requestor ? connection?.requestor : user.sub}
            setLoadingData={setLoadingData}
            fetchFriends={fetchFriends}
            getValues={getValues}
            setSearchResults={setSearchResults}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FriendCard;
