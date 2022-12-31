import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import FriendsList from "../components/FriendsList";
import PageHeader from "../components/PageHeader";
import FriendCard from "../components/FriendCard";
import { useForm } from "react-hook-form";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";

const FriendsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [friends, setFriends] = useState([]);

  const { user } = useAuth0();

  // react-hook-form
  const {
    register,
    formState: { touchedFields },
  } = useForm({
    mode: "onChange",
  });

  //on mount axios get all user's friend connections
  const fetchFriends = async (signal) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${BACKEND_URL}/friends/${user.sub}`,
        signal,
      });
      setFriends(res.data);
      setLoadingData(false);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log("data fetch aborted");
      } else {
        throw new Error(err);
      }
    }
  };

  useEffect(() => {
    setLoadingData(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetchFriends(signal);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Friends" />
      <Box>
        <form>
          <input
            autoComplete="off"
            id="searchBox"
            type="search"
            placeholder="Search by username/email"
            {...register("searchBox")}
            css={css`
              background-color: #313131;
              padding: 3px;
              outline-style: none;
              width: 300px;
              ::placeholder {
                font-size: 12px;
                font-style: italic;
                text-align: center;
              }
              :focus {
                outline-color: lightgrey;
              }
            `}
          />
        </form>
      </Box>
      <Box
        className="friends-page-content"
        width="95vw"
        border={1}
        minHeight="70vh"
        p={1}
        mb={2}
      >
        {searchResults.length > 0 ? (
          searchResults.map((connections) => (
            <FriendCard connections={connections} />
          ))
        ) : (
          <FriendsList
            friends={friends}
            setFriends={setFriends}
            loadingData={loadingData}
          />
        )}
      </Box>
    </Box>
  );
};

export default FriendsPage;
