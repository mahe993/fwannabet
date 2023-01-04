import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";

// create debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}

const UserSearchBar = (props) => {
  const { setSearchResults, setLoadingData, register, watch } = props;

  // to keep track of current network request
  const controllerRef = useRef(null);

  const { getAccessTokenSilently, user } = useAuth0();

  // queryValue updates 1000ms after user input
  const queryValue = useDebounce(watch("searchBar"), 1000);

  // searchUser request fn
  const searchUser = async (query) => {
    try {
      const controller = new AbortController();
      controllerRef.current = controller;
      const accessToken = await getAccessTokenSilently();
      console.log("calling");
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

  // when queryValue is updated (every 1000ms), make a network request
  useEffect(() => {
    // no requests to be made when less than 3 letters typed to prevent returning large number of matches
    if (queryValue && queryValue.length > 2) {
      searchUser(queryValue);
    } else if (queryValue) {
      // when queryValue is 2 characters or less, to show loading animation only
      setSearchResults("");
      setLoadingData(true);
    } else {
      // when user types something and backspace delete all, to remove loading animation and clear results
      setSearchResults("");
      setLoadingData(false);
    }
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [queryValue]);

  // when searchBar value changes (user types input), abort any current network request
  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    // if there is something in the searchBar, start the loading animation
    if (watch("searchBar")) {
      setLoadingData(true);
    }
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
