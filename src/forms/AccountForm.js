import { Box, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { useUserContext } from "../contexts/UserContext";

const AccountForm = (props) => {
  const { setSnackBarOpen, setAlertMessage, setBackDropOpen } = props;
  const { userDetails, setUserDetails } = useUserContext();
  const { getAccessTokenSilently, user } = useAuth0();

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    delayError: 300,
    mode: "onChange",
    values: {
      username: userDetails?.username,
      contactNumber: userDetails?.contactNumber,
    },
  });

  //form handleSubmit submit callback
  const formSubmit = async (values) => {
    //update DB users table username/phoneNumber col where userId = user.sub
    const updateFields = {};
    Object.keys(touchedFields).forEach((key) => {
      if (values[key] === "") {
        updateFields[key] = null;
      } else {
        updateFields[key] = values[key];
      }
    });
    try {
      setBackDropOpen(true);
      const accessToken = await getAccessTokenSilently();
      const update = await axios({
        method: "PUT",
        url: `${BACKEND_URL}/users/${user.sub}/details`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: updateFields,
      });
      setUserDetails(update.data);
      setBackDropOpen(false);
      setAlertMessage("Account info updated!");
      setSnackBarOpen(true);
    } catch (err) {
      setBackDropOpen(false);
      throw new Error(err);
    }
  };

  //form handleSubmit error callback
  const formError = (err) => {
    throw new Error(err);
  };

  return (
    <form onSubmit={handleSubmit(formSubmit, formError)}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Box className="registered-email" p={1} color="gray">
          {user?.email}
        </Box>
        <Box
          className="input-container-username"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={0.5}
        >
          <label htmlFor="input-username">Username</label>
          <input
            autoComplete="off"
            id="input-username"
            type="text"
            {...register("username", {
              maxLength: {
                value: 15,
                message: "Maximum username length is 15 chars!",
              },
              minLength: {
                value: 3,
                message: "Minimum username length is 3 chars!",
              },
            })}
            css={css`
              background-color: #313131;
              padding: 3px;
              outline-style: none;
              :focus {
                outline-color: lightgrey;
              }
            `}
          />
          <Box fontSize={10} color="red" textAlign="center" mt={-0.5}>
            {errors?.username?.message}
          </Box>
        </Box>
        <Box
          className="input-container-phone"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={0.5}
        >
          <label htmlFor="input-contact">Contact Number</label>
          <input
            autoComplete="off"
            id="input-contact"
            type="text"
            {...register("contactNumber", {
              pattern: {
                value: /^[0-9]+$/,
                message: "Please only enter numbers!",
              },
              maxLength: {
                value: 8,
                message: "Contact number should be 8 chars!",
              },
              minLength: {
                value: 8,
                message: "Contact number should be 8 chars!",
              },
            })}
            css={css`
              background-color: #313131;
              padding: 3px;
              outline-style: none;
              :focus {
                outline-color: lightgrey;
              }
            `}
          />
          <Box fontSize={10} color="red" textAlign="center" mt={-0.5}>
            {errors?.contactNumber?.message}
          </Box>
        </Box>
        <Button
          variant="contained"
          type="submit"
          disabled={!isValid}
          css={css`
            margin-top: 10px;
          `}
        >
          Update
        </Button>
      </Box>
    </form>
  );
};

export default AccountForm;
