import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import FriendsList from "../components/FriendsList";
import PageHeader from "../components/PageHeader";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import UserSearchBar from "../components/UserSearchBar";
import SearchResults from "../components/SearchResults";
import { useForm } from "react-hook-form";

const FriendsPage = () => {
  const [searchResults, setSearchResults] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [friends, setFriends] = useState({});

  const { user, getAccessTokenSilently } = useAuth0();

  // react-hook-form
  const { register, watch, getValues } = useForm({
    mode: "onChange",
  });

  //get all user's friend connections
  const fetchFriends = async (signal) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const res = await axios({
        method: "GET",
        url: `${BACKEND_URL}/friends/${user.sub}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
      });
      setFriends(res.data);
      setLoadingData(false);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log("friends data fetch aborted");
      } else {
        throw new Error(err);
      }
    }
  };

  //on mount get all user's friend connections
  useEffect(() => {
    setLoadingData(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetchFriends(signal);
    return () => {
      controller.abort();
      setLoadingData(false);
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Friends" />
      <Box>
        <UserSearchBar
          setSearchResults={setSearchResults}
          setLoadingData={setLoadingData}
          register={register}
          watch={watch}
        />
      </Box>
      <Box
        className="friends-page-content"
        width="95%"
        border={1}
        minHeight="70vh"
        p={1}
        mb={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {loadingData ? (
          <CircularProgress
            css={css`
              justify-self: center;
            `}
          />
        ) : Array.isArray(searchResults) ? (
          <Box textAlign="center" fontStyle="italic">
            No results
          </Box>
        ) : typeof searchResults === "object" ? (
          <SearchResults
            setLoadingData={setLoadingData}
            searchResults={searchResults}
            fetchFriends={fetchFriends}
            getValues={getValues}
            setSearchResults={setSearchResults}
          />
        ) : !friends?.accepted && !friends?.pending ? (
          <Box textAlign="center" fontStyle="italic">
            No friends added yet!
            <br />
            Use the search box to search for friends!
          </Box>
        ) : (
          <FriendsList
            friends={friends}
            fetchFriends={fetchFriends}
            loadingData={loadingData}
            setLoadingData={setLoadingData}
            getValues={getValues}
          />
        )}
      </Box>
    </Box>
  );
};

export default FriendsPage;
