import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import { useForm } from "react-hook-form";

const UserSearchBar = (props) => {
  const [abortController, setAbortController] = useState("");

  const { setSearchResults, setLoadingData } = props;

  const { getAccessTokenSilently, user } = useAuth0();

  // react-hook-form
  const { register, watch } = useForm({
    mode: "onChange",
  });

  // debounce fn
  const debounce = (cb, delay) => {
    let timeOut;

    return (query) => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        cb(query);
      }, delay);
    };
  };

  // using debounce with 500ms delay
  const searchUser = debounce(async (query) => {
    if (query === "" || query === null) {
      setLoadingData(false);
      return;
    }
    if (query.length < 3) {
      return;
    }
    const controller = new AbortController();
    setAbortController(controller);
    //fetch users
    try {
      console.log(query);
      const accessToken = await getAccessTokenSilently();
      const users = await axios({
        method: "GET",
        url: `${BACKEND_URL}/users/search/${user.sub}/${query}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      });
      setSearchResults(users);
      setLoadingData(false);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("User search request cancelled");
      } else {
        setLoadingData(false);
        throw new Error(err);
      }
    }
  }, 2000);

  // when searchBar value changes, call debounce
  useEffect(() => {
    if (abortController) {
      abortController.abort();
    }
    setLoadingData(true);
    searchUser(watch("searchBar"));
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
