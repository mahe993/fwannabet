import { Box } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import MessageIcon from "@mui/icons-material/Message";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const FriendCardButtons = (props) => {
  const { connectionStatus, requestee, requestor, setLoadingFriendsPage } =
    props;

  const { user, getAccessTokenSilently } = useAuth0();

  // remove friend connection
  const removeConnection = async () => {
    try {
      setLoadingFriendsPage(true);
      const accessToken = await getAccessTokenSilently();
      await axios({
        method: "DELETE",
        url: `${BACKEND_URL}/friends/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          status: connectionStatus,
          requestee: requestee,
          requestor: requestor,
        },
      });
      setLoadingFriendsPage(false);
    } catch (err) {
      setLoadingFriendsPage(false);
      throw new Error(err);
    }
  };

  // accept friend request
  const acceptFriendRequest = async () => {
    try {
      setLoadingFriendsPage(true);
      const accessToken = await getAccessTokenSilently();
      await axios({
        method: "PUT",
        url: `${BACKEND_URL}/friends/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          requestee: requestee,
          requestor: requestor,
        },
      });
      setLoadingFriendsPage(false);
    } catch (err) {
      setLoadingFriendsPage(false);
      throw new Error(err);
    }
  };

  // send friend invitation
  const sendFriendRequest = async () => {
    try {
      if (requestee === user.sub) {
        throw new Error({ msg: "Requestee cannot be yourself!" });
      }
      setLoadingFriendsPage(true);
      const accessToken = await getAccessTokenSilently();
      await axios({
        method: "POST",
        url: `${BACKEND_URL}/friends/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          requestee: requestee,
          requestor: requestor,
        },
      });
      setLoadingFriendsPage(false);
    } catch (err) {
      setLoadingFriendsPage(false);
      throw new Error(err);
    }
  };

  return (
    <>
      {connectionStatus === "accepted" && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <MessageIcon onClick={() => alert("Feature in development!")} />
          <PersonRemoveIcon
            color="warning"
            onClick={() => {
              removeConnection();
            }}
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
          <CancelIcon color="warning" onClick={() => removeConnection()} />
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
            onClick={() => acceptFriendRequest()}
          />
          <DoDisturbOnIcon color="warning" onClick={() => removeConnection()} />
        </Box>
      )}
      {!connectionStatus && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <PersonAddIcon color="success" onClick={() => sendFriendRequest()} />
          <Box fontSize={10} fontStyle="italic" color="darkgreen">
            Add Friend
          </Box>
        </Box>
      )}
    </>
  );
};

export default FriendCardButtons;
