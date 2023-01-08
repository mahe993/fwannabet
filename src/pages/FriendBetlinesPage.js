import { Avatar, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import BetlineCard from "../components/BetlineCard";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLocation, useParams } from "react-router-dom";
import noPFP from "../assets/images/noPFP.jpg";

const FriendBetlinesPage = () => {
  const [betlines, setBetlines] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const { getAccessTokenSilently } = useAuth0();
  const { state } = useLocation();
  const { email } = useParams();

  // get all user's betlines fn
  const getBetlines = async (signal) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const res = await axios({
        method: "GET",
        url: `${BACKEND_URL}/betlines/${state?.id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
      });
      setBetlines(res.data);
      setLoadingData(false);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log("friend betlines data fetch aborted");
      } else {
        throw new Error(err);
      }
    }
  };

  //on mount get all user's betlines
  useEffect(() => {
    setLoadingData(true);
    const controller = new AbortController();
    const signal = controller.signal;
    getBetlines(signal);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header={"Betlines"} />
      {loadingData ? (
        <CircularProgress
          css={css`
            justify-self: center;
          `}
        />
      ) : (
        <>
          <Box
            className="friend-username-email"
            p={1}
            color="lightgrey"
            mt={-1}
            mb={-1}
          >
            {state?.username ? state?.username : email}
          </Box>
          <Avatar
            alt="profile-pic"
            src={state?.profilePicture ? state?.profilePicture : noPFP}
            sx={{ width: "120px", height: "120px" }}
          />
          <Box
            className="betlines-card-container"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            width="95vw"
          >
            {betlines.length > 0 &&
              betlines.map((betline) => (
                <Box key={betline.id} width="100%">
                  <BetlineCard details={betline} />
                </Box>
              ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default FriendBetlinesPage;
