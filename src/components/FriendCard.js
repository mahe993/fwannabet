import { Avatar, Box } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import noPFP from "../assets/images/noPFP.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import FriendCardButtons from "./FriendCardButtons";
import { useNavigate } from "react-router-dom";

const FriendCard = (props) => {
  const {
    connection,
    setLoadingData,
    fetchFriends,
    getValues,
    setSearchResults,
  } = props;

  const { user } = useAuth0();
  const navigate = useNavigate();

  // navigate action upon click on accepted friend's profile pic
  const enterFriendBetlinesPage = () => {
    if (connection?.status !== "accepted") return;
    navigate(`/friend/betlines/${connection?.email}`, {
      state: {
        id: connection?.id,
        username: connection?.username,
        profilePicture: connection?.profilePicture?.downloadUrl,
      },
    });
  };

  return (
    <Box
      className="friend-card-container"
      display="flex"
      borderRadius="50px"
      border={2}
      borderColor={
        !connection?.status
          ? "gray"
          : connection?.status === "accepted"
          ? "green"
          : "orange"
      }
      alignItems="center"
      width="95%"
      gap={1}
      fontSize={14}
      mb={1}
      mt={1}
    >
      <Box
        className="profile-pic-container"
        borderRadius="50%"
        height="100px"
        width="100px"
        onClick={enterFriendBetlinesPage}
      >
        <Avatar
          src={
            connection?.profilePicture
              ? connection?.profilePicture?.downloadUrl
              : noPFP
          }
          alt="profile-pic"
          sx={{ width: "100px", height: "100px" }}
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
