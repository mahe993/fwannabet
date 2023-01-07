import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import CircularProgress from "@mui/material/CircularProgress";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BetlineCard from "../components/BetlineCard";

const BetlinesTab = () => {
  const [betlines, setBetlines] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const { user, getAccessTokenSilently } = useAuth0();

  const getFriendsBetlines = async (signal) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const lines = await axios({
        method: "GET",
        url: `${BACKEND_URL}/betlines/friends/${user.sub}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: signal,
      });
      setBetlines(lines.data);
      setLoadingData(false);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log("betlines data fetch aborted");
      } else {
        throw new Error(err);
      }
    }
  };

  // on mount get all betlines owned by friends
  useEffect(() => {
    setLoadingData(true);
    const controller = new AbortController();
    const signal = controller.signal;
    // get all betlines owned by friends
    getFriendsBetlines(signal);
    return () => {
      controller.abort();
      setLoadingData(false);
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="95vw"
      gap={2}
    >
      {loadingData ? (
        <CircularProgress
          css={css`
            justify-self: center;
          `}
        />
      ) : betlines.length === 0 ? (
        <Box>No Betlines available. Create one yourself!</Box>
      ) : (
        betlines.map((betline) => (
          <Box key={betline.id} width="100%">
            <BetlineCard details={betline} />
          </Box>
        ))
      )}
    </Box>
  );
};

export default BetlinesTab;
