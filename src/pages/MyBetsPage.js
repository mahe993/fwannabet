import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BetCard from "../components/BetCard";

const MyBetsPage = () => {
  const [bets, setBets] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const { user, getAccessTokenSilently } = useAuth0();

  // get all user's bets fn
  const getBets = async (signal) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const res = await axios({
        method: "GET",
        url: `${BACKEND_URL}/bets/${user.sub}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
      });
      setBets(res.data);
      setLoadingData(false);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log("bets data fetch aborted");
      } else {
        throw new Error(err);
      }
    }
  };

  //on mount get all user's bets
  useEffect(() => {
    setLoadingData(true);
    const controller = new AbortController();
    const signal = controller.signal;
    getBets(signal);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="My Bets" />
      {loadingData ? (
        <CircularProgress
          css={css`
            justify-self: center;
          `}
        />
      ) : bets.length === 0 ? (
        <Box
          textAlign="center"
          color="red"
          fontSize={14}
          fontStyle="italic"
          p={2}
        >
          You have no bets yet!
        </Box>
      ) : (
        <Box
          className="bets-card-container"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          width="95vw"
          mb={2}
        >
          {bets.length > 0 &&
            bets.map((bet) => (
              <Box key={bet.id} width="100%">
                <BetCard details={bet} />
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default MyBetsPage;
