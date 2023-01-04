import { Box } from "@mui/material";
import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import MessageIcon from "@mui/icons-material/Message";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import ConfirmationDialog from "./ConfirmationDialog";

const FriendCardButtons = (props) => {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [confirmationDialogContent, setConfirmationDialogContent] =
    useState("");
  const [dialogButtonAction, setDialogButtonAction] = useState("");

  const {
    connectionStatus,
    requestee,
    requestor,
    setLoadingData,
    fetchFriends,
    requesteeId, // only valid when there is no connectionStatus, otherwise this value is the friend connectionId
    getValues,
    setSearchResults,
  } = props;

  const { user, getAccessTokenSilently } = useAuth0();

  // searchUser request fn
  const searchUser = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const users = await axios({
        method: "GET",
        url: `${BACKEND_URL}/users/search/${user.sub}/${getValues(
          "searchBar"
        )}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSearchResults(users.data);
      setLoadingData(false);
    } catch (err) {
      setLoadingData(false);
      throw new Error(err);
    }
  };

  // remove friend connection
  const removeConnection = async () => {
    try {
      setLoadingData(true);
      const accessToken = await getAccessTokenSilently();
      const del = await axios({
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
      if (del.data.msg === "success") {
        // if there is value on searchBar, it means user is using the buttons while on search functionality
        if (getValues("searchBar")) {
          searchUser();
        }
        // refresh friend list
        fetchFriends();
      }
    } catch (err) {
      setLoadingData(false);
      throw new Error(err);
    }
  };

  // accept friend request
  const acceptFriendRequest = async () => {
    try {
      setLoadingData(true);
      const accessToken = await getAccessTokenSilently();
      const accept = await axios({
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
      if (accept.data.msg === "success") {
        // if there is value on searchBar, it means user is using the buttons while on search functionality
        if (getValues("searchBar")) {
          searchUser();
        }
        // refresh friend list
        fetchFriends();
      }
    } catch (err) {
      setLoadingData(false);
      throw new Error(err);
    }
  };

  // send friend invitation (only possible by using searchbar, thus related)
  const sendFriendRequest = async () => {
    try {
      setLoadingData(true);
      const accessToken = await getAccessTokenSilently();
      const req = await axios({
        method: "POST",
        url: `${BACKEND_URL}/friends/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          requestee: requesteeId,
          requestor: user.sub,
        },
      });
      // after successful sending, re-search searchbar value
      if (req.data.msg === "success") {
        // if there is value on searchBar, it means user is using the buttons while on search functionality
        if (getValues("searchBar")) {
          searchUser();
        }
        // refresh friend list
        fetchFriends();
      }
    } catch (err) {
      setLoadingData(false);
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
          <MessageIcon
            onClick={() => {
              setConfirmationDialogContent("Feature in development!");
              setOpenConfirmationDialog(true);
            }}
          />
          <PersonRemoveIcon
            color="warning"
            onClick={() => {
              setDialogButtonAction({
                confirm: removeConnection,
              });
              setConfirmationDialogContent(`Remove from friend list?`);
              setOpenConfirmationDialog(true);
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
          <CancelIcon
            color="warning"
            onClick={() => {
              setDialogButtonAction({
                confirm: removeConnection,
              });
              setConfirmationDialogContent(`Cancel friend invite?`);
              setOpenConfirmationDialog(true);
            }}
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
            onClick={() => acceptFriendRequest()}
          />
          <DoDisturbOnIcon
            color="warning"
            onClick={() => {
              setDialogButtonAction({
                confirm: removeConnection,
              });
              setConfirmationDialogContent(`Reject friend request?`);
              setOpenConfirmationDialog(true);
            }}
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
          <PersonAddIcon color="success" onClick={() => sendFriendRequest()} />
          <Box fontSize={10} fontStyle="italic" color="lightgreen">
            Add Friend
          </Box>
        </Box>
      )}
      <ConfirmationDialog
        openConfirmationDialog={openConfirmationDialog}
        setOpenConfirmationDialog={setOpenConfirmationDialog}
        confirmationDialogContent={confirmationDialogContent}
        dialogButtonAction={dialogButtonAction}
        setDialogButtonAction={setDialogButtonAction}
      />
    </>
  );
};

export default FriendCardButtons;
