import PageHeader from "../components/PageHeader";
import { Avatar, Badge, Box } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import AccountForm from "../forms/AccountForm";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL, validateFileType } from "../constants.js";
import { useUserContext } from "../contexts/UserContext";
import CustomSnackBar from "../components/CustomSnackBar";
import BackdropLoading from "../components/BackdropLoading";

const AccountPage = () => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [backDropOpen, setBackDropOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { userDetails, setUserDetails } = useUserContext();
  const { user, getAccessTokenSilently } = useAuth0();

  // update profile pic
  const handleProfilePic = async (e) => {
    const validFile = validateFileType(e.target.files[0]);
    if (!validFile) return alert("Please upload a valid image file");
    const formData = new FormData();
    formData.append("picture", e.target.files[0]);
    try {
      const accessToken = await getAccessTokenSilently();
      const postProfilePic = await axios({
        method: "POST",
        url: `${BACKEND_URL}/users/${user.sub}/profilepic`,
        headers: { Authorization: `Bearer ${accessToken}` },
        data: formData,
      });
      // get the setUserDetails from usercontext
      setUserDetails(postProfilePic.data);
      setAlertMessage("Profile picture successfully updated!");
      setSnackBarOpen(true);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <PageHeader header="Account" />
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <label
              htmlFor="edit-profile-pic"
              css={css`
                cursor: pointer;
              `}
            >
              <input
                accept="image/*"
                id="edit-profile-pic"
                type="file"
                css={css`
                  display: none;
                `}
                onChange={(e) => {
                  handleProfilePic(e);
                }}
              />
              <EditIcon fontSize="large" />
            </label>
          }
        >
          <Avatar
            alt="profile"
            src={userDetails?.profilePicture?.downloadUrl}
            sx={{ width: "150px", height: "150px" }}
          />
        </Badge>
        <Box>
          <AccountForm
            setSnackBarOpen={setSnackBarOpen}
            setAlertMessage={setAlertMessage}
            setBackDropOpen={setBackDropOpen}
          />
        </Box>
      </Box>
      <CustomSnackBar
        snackBarOpen={snackBarOpen}
        setSnackBarOpen={setSnackBarOpen}
        alertMessage={alertMessage}
      />
      <BackdropLoading backDropOpen={backDropOpen} />
    </>
  );
};

export default AccountPage;
