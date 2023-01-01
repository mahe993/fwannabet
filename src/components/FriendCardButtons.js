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
import ErrorDialog from "./ConfirmationDialog";

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
  } = props;

  const { user, getAccessTokenSilently } = useAuth0();

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
      console.log(accept.data);
      if (accept.data.msg === "success") {
        fetchFriends();
      }
    } catch (err) {
      setLoadingData(false);
      throw new Error(err);
    }
  };

  // send friend invitation
  const sendFriendRequest = async () => {
    try {
      if (requestee === user.sub) {
        throw new Error({ msg: "Requestee cannot be yourself!" });
      }
      setLoadingData(true);
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
      setLoadingData(false);
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
          <Box fontSize={10} fontStyle="italic" color="darkgreen">
            Add Friend
          </Box>
        </Box>
      )}
      <ErrorDialog
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
