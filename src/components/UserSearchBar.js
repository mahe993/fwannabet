import React, { useEffect, useRef } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";

const UserSearchBar = (props) => {
  const { setSearchResults, setLoadingData, register, watch } = props;

  // to keep track of current network request
  const controllerRef = useRef(null);

  const { getAccessTokenSilently, user } = useAuth0();

  // searchUser request fn
  const searchUser = async (query) => {
    try {
      const controller = new AbortController();
      controllerRef.current = controller;
      const accessToken = await getAccessTokenSilently();
      const users = await axios({
        method: "GET",
        url: `${BACKEND_URL}/users/search/${user.sub}/${query}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      });
      setSearchResults(users.data);
      setLoadingData(false);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Search users request aborted", err.message);
      } else {
        setLoadingData(false);
        throw new Error(err);
      }
    }
  };

  // when searchBar value changes (user types input),
  // 1. abort any current network request
  // 2. start loading animation if there is some value in searchBar
  // 3. check value length, if greater than 2, send value to debounced network request
  // 4. whenever value changes (user inputs again), cleanup is run, clear timeout and abort any current network request
  useEffect(() => {
    // if there is something in the searchBar, start the loading animation
    if (watch("searchBar")) {
      setLoadingData(true);
    }

    let timeout;
    if (watch("searchBar") && watch("searchBar").length > 2) {
      // run debounce
      timeout = setTimeout(() => {
        searchUser(watch("searchBar"));
      }, 1000);
    } else if (watch("searchBar")) {
      // when watch("searchBar") is 2 characters or less, to show loading animation only
      setSearchResults("");
      setLoadingData(true);
    } else {
      // when user types something and backspace delete all, to remove loading animation and clear results
      setSearchResults("");
      setLoadingData(false);
    }

    return () => {
      // cleanup on every searchBar state change
      clearTimeout(timeout);
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [watch("searchBar")]);

  return (
    <form>
      <input
        autoComplete="off"
        id="searchBox"
        type="search"
        placeholder="Search by username/email"
        {...register("searchBar")}
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
  );
};

export default UserSearchBar;
